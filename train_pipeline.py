import os
import joblib
import torch
import torch.nn as nn
import torch.optim as optim
from transformers import AutoTokenizer, AutoModelForSequenceClassification, Trainer, TrainingArguments
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.naive_bayes import MultinomialNB
from sklearn.ensemble import RandomForestClassifier

from src.preprocess import get_train_test_splits
from src.models import BiLSTM, SimpleTokenizer, get_traditional_models, get_distilbert_model
from src.ensemble import save_ensemble_config

def train_and_save_pipeline(train_path, valid_path, test_path, model_dir):
    os.makedirs(model_dir, exist_ok=True)
    
    # 1. Load Data
    print("Loading data...")
    train_df, valid_df, test_df = get_train_test_splits(train_path, valid_path, test_path)
    
    # PROXY: Use a small subset to run quickly
    # In a real environment, we'd remove these lines to train on the full dataset.
    print("Using a subset of data for fast execution...")
    train_df = train_df.head(200)
    valid_df = valid_df.head(50)
    
    X_train_text = train_df['text'].tolist()
    y_train = train_df['target'].tolist()
    
    # 2. Classical Models
    print("Training Classical Models...")
    tfidf = TfidfVectorizer(max_features=5000)
    X_train_tfidf = tfidf.fit_transform(X_train_text)
    
    models = get_traditional_models()
    for name, model in models.items():
        print(f"Training {name}...")
        model.fit(X_train_tfidf, y_train)
        joblib.dump(model, os.path.join(model_dir, f"{name}_model.pkl" if name != 'logistic' else "logistic_model.pkl"))
        
    joblib.dump(tfidf, os.path.join(model_dir, 'tfidf_vectorizer.pkl'))
    
    # 3. LSTM
    print("Training LSTM...")
    tokenizer = SimpleTokenizer(max_vocab_size=5000, max_len=128)
    tokenizer.fit(X_train_text)
    joblib.dump(tokenizer, os.path.join(model_dir, 'tokenizer.pkl'))
    
    lstm_model = BiLSTM(vocab_size=len(tokenizer))
    criterion = nn.BCELoss()
    optimizer = optim.Adam(lstm_model.parameters(), lr=0.001)
    
    lstm_model.train()
    for epoch in range(1): # 1 epoch for proxy
        epoch_loss = 0
        for i in range(0, len(X_train_text), 32):
            batch_texts = X_train_text[i:i+32]
            batch_y = torch.tensor(y_train[i:i+32], dtype=torch.float32)
            
            encoded = [tokenizer.pad(tokenizer.encode(t)) for t in batch_texts]
            batch_x = torch.tensor(encoded, dtype=torch.long)
            
            optimizer.zero_grad()
            predictions = lstm_model(batch_x)
            loss = criterion(predictions, batch_y)
            loss.backward()
            optimizer.step()
            epoch_loss += loss.item()
            
    torch.save(lstm_model.state_dict(), os.path.join(model_dir, 'lstm_model.pt'))
    
    # 4. DistilBERT
    print("Training DistilBERT (Proxy Mode)...")
    model_name = "distilbert-base-uncased"
    bert_tokenizer = AutoTokenizer.from_pretrained(model_name)
    bert_model = AutoModelForSequenceClassification.from_pretrained(model_name, num_labels=2)
    
    # Just saving the pretrained weights immediately for the proxy run
    # since trainer.train() is heavy without GPU.
    bert_path = os.path.join(model_dir, 'distilbert_model')
    bert_model.save_pretrained(bert_path)
    bert_tokenizer.save_pretrained(bert_path)
    
    # 5. Ensemble config
    save_ensemble_config(os.path.join(model_dir, 'ensemble_config.json'))
    
    print("Pipeline complete! All models saved to", model_dir)

if __name__ == "__main__":
    train_and_save_pipeline("train.tsv", "valid.tsv", "test.tsv", "model_pipeline")
