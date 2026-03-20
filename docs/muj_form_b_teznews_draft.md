# MANIPAL UNIVERSITY JAIPUR
## Directorate of Research
## Invention Disclosure Form - Confidential
## Form-B

Please Note: Kindly Fill this "form -B and Send the soft copy to manish.rawat@jaipur.manipal.edu

DoR Reference Number:
[To be allotted by DoR]

Date of Submission:
[DD/MM/YYYY]

MUJ Filing Categories-A, B, C
[To be selected with DoR]

In Case Category-C selected, Provide Filing Country Name
Not applicable at present unless DoR advises foreign filing.

Stage of Project: (Select one)
Working model

Submitted by Faculty: (Corresponding Inventor)
Name, Designation
Department and School
[Faculty corresponding inventor / mentor details to be added]

Name of all Inventors
Name, Designation
Department and School
Parth Bajaj, Student, CCE
[Add remaining inventor names, designations, and departments]

A Patent Application must meet the following criteria in order to apply for patent:

New: The work must be new and have not been disclosed earlier, anywhere, in any form.
Useful: The work should generally be useful to company/industry/society and not merely for additional research/promotion.
Unobvious: Inventors should have identified unique aspects of the work in their research domain and should not be obvious to persons ordinarily skilled in the art.

- Proposed Title of the Invention (Not more than 10 to15 words)
AI and Blockchain-Based System for Credibility Assessment and Verification of News Articles

- Proposed Abstract of the Invention (Kindly explain the crux of the invention in about 150 to 200 words.)
The invention discloses a computer-implemented system and method for assessing the credibility of digital news content and preserving tamper-evident verification records for later validation. A news item submitted through an administrative or publishing interface is cleaned and normalized, processed through a credibility analysis engine that evaluates linguistic features, source attributes, and machine-learning classification outputs, and assigned a prediction label, confidence value, reasons, and a credibility score. A summary generation module produces a short-form synopsis for reader consumption. In parallel, a hashing module computes a cryptographic hash of the article content and stores the hash together with verification metadata such as timestamp, transaction identifier, prediction, and credibility score in an immutable or blockchain-backed ledger. A verification interface allows users, administrators, or partner institutions to later confirm whether a viewed article matches a previously registered record. By combining content analysis, metadata attestation, and user-facing verification in a single workflow, the invention improves traceability, trust, and misinformation control in digital news ecosystems.

- Key Words:
Fake news detection, digital news credibility, blockchain verification, article hash verification, credibility scoring, NLP-based news analysis, tamper-evident ledger, short-form news validation, content provenance, misinformation control.

- Background of the Invention: What are the present technologies that exist in the field of your invention and what are the limitations of the same? (Present state of Art)
Some of the present technologies in this domain include:

1. Fake news detection systems based on natural language processing and machine learning.
Such systems classify a news article as genuine or misleading using textual features, metadata, or source-based analysis.
Limitations: These systems usually provide only a prediction result and do not preserve tamper-evident verification records for future validation. Their outputs are often isolated from the publication and distribution workflow.

2. Blockchain-based provenance and authenticity systems for documents or digital media.
These systems store content fingerprints, signatures, or provenance records in distributed ledgers.
Limitations: These systems generally confirm whether a particular item existed in a certain form at a certain time, but they do not assess the semantic credibility, trustworthiness, or misinformation risk of the content itself.

3. Conventional digital news and content delivery platforms.
These platforms focus on content presentation, engagement, and sharing.
Limitations: They usually lack integrated credibility scoring, explanation generation, and direct reader-facing integrity verification tied to the same news item.

4. Fact-checking workflows driven by manual moderation.
Such workflows depend on editorial review, user reports, or third-party validation.
Limitations: Manual review is slow, difficult to scale, and often disconnected from technical integrity checks such as cryptographic content verification.

Therefore, the present state of the art provides isolated solutions for classification, attestation, or content delivery, but does not adequately provide a unified platform that combines automated credibility assessment, cryptographic content registration, and user-side verification for digital news articles.

- What problems does the invention address and how your Invention is able to overcome the limitations/ problems of the existing technologies?
The invention addresses both a content-trust problem and a technical systems problem in digital publishing. In current digital news environments, an article may be ingested, edited, scored, stored, shared, and re-checked across multiple interfaces and services. Existing technologies do not adequately provide a deterministic technical mechanism that binds the analyzed article content, its credibility outcome, and its later verification state into a single coordinated workflow. As a result, credibility assessment, provenance recording, and user-side verification often remain disconnected, creating inconsistency in article identity, weak traceability, and inefficient validation.

The proposed invention overcomes these limitations by implementing an integrated networked architecture in which article ingestion, text normalization, credibility computation, cryptographic fingerprint generation, metadata registration, and later verification are executed as linked technical operations. The article content is processed into a normalized machine-readable form, evaluated for credibility, converted into a cryptographic content fingerprint, and registered together with validation metadata in an immutable or tamper-evident record layer. The same registered fingerprint can later be queried through a verification interface to confirm content integrity and record existence. This produces a technical effect in the form of deterministic article-to-record binding, improved integrity verification, efficient record retrieval through content fingerprint matching, and reduced dependence on disconnected manual validation paths.

- Detailed Explanation of the Invention along with working examples. Kindly provide an elaborated description of each and every aspect of the invention (product and/or process) in great detail.
The invention is a computer-implemented and network-deployed system and method for credibility assessment, registration, and later verification of digital news content. The invention may be implemented as a web platform, mobile platform, server-side service, API, enterprise dashboard, or hybrid cloud deployment.

In one embodiment, the system comprises:

1. a publisher-side terminal or administrative client configured to submit article data;
2. an application server configured to receive and orchestrate article processing requests;
3. a text processing and credibility computation engine configured to normalize content and generate credibility outputs;
4. a hashing engine configured to generate a cryptographic fingerprint from the article content;
5. a data store and immutable registry or blockchain interface configured to preserve verification metadata;
6. a verification client or reader-side terminal configured to request and display integrity verification status; and
7. a communication network interconnecting the above components.

The working relationship and connectivity of these components are such that an article received at the publisher-side interface is transmitted to the application server, processed by the text and scoring engine, registered via the hashing and ledger layer, and later checked through the verification client against the registered record. Thus, the invention is not directed to a mere computer program in isolation, but to an implemented technical system having interacting components and defined data flow.

The system broadly comprises the following modules:

1. News ingestion module
An article is submitted into the system through an administrative upload interface, newsroom dashboard, API endpoint, or content management workflow. The submitted data may include title, body content, source name, category, author name, publication date, optional media metadata, and publisher-side session details.

2. Text preprocessing and normalization module
The input article title and body are cleaned and normalized to reduce noise and prepare the data for downstream analysis. The preprocessing may include lowercasing, symbol cleaning, whitespace normalization, token handling, stopword treatment, or other standard text-cleaning operations.

3. Credibility analysis module
The processed article is evaluated using a credibility engine that may include one or more of the following:
- linguistic pattern analysis
- keyword and phrase detection
- urgency or sensationalism detection
- source-based scoring or trusted-source matching
- machine learning classification using vectorized text input

The module outputs a predicted label, such as real or fake, along with a confidence value, credibility score, and human-readable reasons supporting the result.
The credibility computation may be performed by a hybrid engine that combines machine-learning-assisted classification with configurable rule-based analysis, thereby allowing the system to generate a structured and machine-consumable credibility result for downstream registry storage and verification.

4. Summary generation module
To make the article easier to consume in a short-form interface, the system may generate a concise summary from the article content. This summary can be displayed along with the credibility output to readers or moderators.

5. Hash generation module
The article content is transformed into a cryptographic hash, preferably using SHA-256, although other secure hashing methods may also be used. This hash serves as a content fingerprint for future verification.

6. Ledger or blockchain registration module
The generated content hash is stored with associated metadata such as timestamp, transaction identifier, prediction label, credibility score, and publisher or network details. The storage may be on-chain, off-chain with blockchain anchoring, or in a tamper-evident ledger architecture.
The registration module is technically linked to the upstream processing flow so that the verification record is created from the same processed article instance that produced the credibility outcome, thereby preserving deterministic binding between analysis output and content fingerprint.

7. Verification module
At a later time, a user, moderator, or institution may submit a story hash and optionally a transaction reference to verify whether the content corresponds to a previously registered article. The system returns a verified or not-found result and may also display related verification metadata.
The verification operation may involve exact hash matching, record lookup, transaction matching, and integrity status generation. This provides a technical mechanism for efficient validation of whether a distributed copy of an article corresponds to a registered article instance.

8. Reader and moderation interface
The resulting article may be displayed in a user-facing interface that shows the article summary, prediction badge, credibility score, and verification status. Additional actions such as save, report, or moderation review may also be supported.

Working example:
An administrator uploads a digital news article to the platform. The system cleans the article text, evaluates the article using its credibility engine, generates a credibility score and classification label, and simultaneously creates a cryptographic content hash. The hash and related metadata are then stored in a ledger record with a transaction reference and timestamp. The article is published to a reader-facing interface together with its summary and credibility indicators. A user later opens the verification page, enters or auto-loads the article hash, and the system confirms whether the article matches the stored record. If the hash exists and matches the transaction reference, the system returns a positive verification status. If no such record exists, the system reports that no matching ledger entry is found.

Alternative embodiments:
The invention may use classical machine learning models, deep learning models, transformer-based models, hybrid rule-based scoring, centralized databases with immutable logs, fully decentralized ledgers, or combinations thereof. The same inventive concept may be applied to articles, posts, bulletins, reports, or other digital information units.

- Please explain what is novel about the invention? And Whether the innovation is obvious to persons skilled in the field (Obviousness).
The novelty of the invention does not lie merely in using machine learning, blockchain, or news interfaces independently, because each of these is known in isolation. The novelty lies in the coordinated and publication-time integration of these components into a single implemented technical workflow for digital news credibility assessment and integrity verification.

In particular, the invention introduces:

1. A unified pipeline in which article ingestion, credibility analysis, explanation generation, content hashing, metadata registration, and later verification are performed as connected stages of the same system.

2. A method in which credibility-related outputs such as prediction label, confidence, and credibility score are linked with a cryptographic content fingerprint and preserved as a tamper-evident verification record.

3. A reader-facing verification architecture in which the same article displayed for consumption can later be independently checked against the registered record using its story hash and optional transaction identifier.

4. A software workflow adapted specifically for digital news trust management, where semantic credibility assessment and integrity attestation operate together rather than as separate products.

Technical effect / technical contribution:
The invention yields technical effect and technical contribution in that it provides deterministic content-to-record binding, tamper-evident article registration, efficient verification through cryptographic lookup, improved traceability of article states across distributed interfaces, and a concrete system architecture for preserving integrity and validation metadata at publication time. The invention therefore addresses a technical problem in digital content handling and verification rather than merely presenting information or executing an abstract algorithm.

With respect to obviousness, a person skilled in either fake-news detection or blockchain-based content attestation may know individual components, but combining them into a publication-ready technical workflow that jointly solves credibility estimation, traceability, verification, and system-level integrity management is not a straightforward or routine substitution. The inventive concept lies in the specific interoperating architecture and processing sequence, and not in a mere recital of software logic. The invention therefore appears to have inventive merit, although final patentability should be assessed after a deeper prior-art review.

- What is the commercial viability of the innovation or is it capable of industrial production? (Industrial applicability)
Yes, the invention has strong commercial viability and clear industrial applicability. The proposed system can be deployed by digital news publishers, media houses, fact-checking agencies, academic institutions, social media monitoring platforms, civic-tech platforms, enterprise trust-and-safety teams, and content moderation service providers. The invention may be commercialized as:

1. A SaaS platform for publishers and media organizations.
2. An API-based credibility and verification service for third-party news apps.
3. A white-label trust layer for digital publishing platforms.
4. An institutional dashboard for fact-checking, moderation, and public information validation.

The invention is capable of industrial production because it can be implemented using scalable software components, server infrastructure, cloud deployment, and standardized APIs. It is suitable for large-volume processing of digital content and can be adapted to multiple languages, domains, and publishing environments.

- Kindly attach drawings, reports, papers, charts or other materials that may aid in your description.
The following supporting materials may be attached:

1. System architecture diagram of TezNews.
2. Blockchain verification flow diagram.
3. User flow diagram for admin upload, analysis, publication, and verification.
4. Screenshots of the home page, verification page, and admin dashboard.
5. Machine learning workflow and model evaluation reports.
6. API flow documentation and module-wise architecture notes.

Suggested internal attachments from the current project:
- docs/system_architecture.md
- docs/blockchain_flow.md
- docs/user_flow.md
- docs/ml_workflow.md
- docs/api_documentation.md
- docs/screenshots/home.svg
- docs/screenshots/verify.svg
- docs/screenshots/admin_dashboard.svg
- ml/experiments/logistic_regression_results.json
- ml/experiments/naive_bayes_results.json
- ml/experiments/random_forest_results.json

- What are the aspects of your disclosure that you want to claim/monopolize?
The aspects proposed to be claimed include the following:

1. A networked digital news validation system having interacting publisher-side, processing-side, registry-side, and verification-side components configured to operate as a unified technical architecture.

2. A computer-implemented processing sequence for receiving a digital news article, preprocessing the content, generating a credibility assessment, computing a cryptographic content hash, and storing verification metadata in a tamper-evident ledger.

3. A method of associating a content hash with credibility-related metadata including one or more of prediction label, confidence score, credibility score, timestamp, source information, and transaction identifier for later independent verification.

4. A verification mechanism allowing a user or moderator terminal to confirm article integrity and registry presence using a content hash and optionally a transaction reference.

5. A publication workflow in which article analysis, registration, and reader-side verification are technically linked to the same article instance and publication event.

- Proposed Claims:
1. A networked digital news validation system comprising:
(a) a publisher-side input interface configured to receive article data comprising at least title text and body content;
(b) an application server configured to route the received article data to a preprocessing module and a credibility analysis module;
(c) the preprocessing module configured to normalize the received article data into machine-processable article content;
(d) the credibility analysis module configured to generate at least a classification label and a credibility score for the machine-processable article content;
(e) a hashing module configured to generate a cryptographic content fingerprint from the machine-processable article content;
(f) a registry interface configured to store the cryptographic content fingerprint together with verification metadata in an immutable registry or blockchain-backed record layer; and
(g) a verification interface configured to receive a verification request and determine whether the cryptographic content fingerprint corresponds to a stored registry record.

2. The system as claimed above, wherein the verification metadata comprises one or more of a prediction label, confidence value, credibility score, timestamp, source identifier, publisher identifier, network identifier, and transaction reference.

3. The system as claimed above, wherein the credibility analysis module comprises a hybrid engine combining rule-based linguistic evaluation with machine-learning-assisted classification.

4. The system as claimed above, wherein the verification interface is configured to receive a story hash and optionally a transaction identifier and to output a verified status or a no-match status based on comparison with stored registry entries.

5. A computer-implemented method for credibility assessment and integrity verification of a digital news article, the method comprising:
receiving article data at a publisher-side interface;
normalizing the article data at a preprocessing module;
computing a credibility output for the normalized article data;
generating a cryptographic content fingerprint for the normalized article data;
storing the cryptographic content fingerprint with associated credibility metadata in an immutable registry; and
subsequently verifying, through a verification interface, whether a queried article corresponds to the stored registry record.

6. The system or method as claimed above, wherein the immutable registry comprises a blockchain, blockchain-anchored registry, or tamper-evident ledger.

- Have you conducted novelty/inventiveness search for your invention? If yes, what are the databases /references used by you? What Keywords did you use and What are the search results?
Yes, a preliminary novelty and inventiveness search has been conducted.

Databases / references used:
1. Google Patents
2. Public web search for patent literature and technical references

Keywords used:
fake news detection patent, news credibility verification patent, blockchain news verification, article authenticity blockchain, digital content provenance validation, content hash verification, misinformation detection system, news article trust scoring.

Preliminary search results:
1. Related documents were found for automatic fake-news detection and machine-learning-based misinformation identification.
2. Related documents were found for article attestation, authenticity reporting, and provenance verification using ledger or blockchain-style systems.
3. Related documents were found for provenance and validation of electronic content in tamper-evident systems.
4. No identical reference was found in this preliminary search for the exact TezNews workflow that combines publication-time news credibility scoring, cryptographic article registration, and reader-facing verification in a single short-form news platform. This is a preliminary inference and should be validated through a more detailed professional patentability search before filing.

Representative references identified during preliminary search:
1. US11494648B2 - Apparatus and method for automatically detecting fake news.
2. WO2019030653A1 - Multi-task learning model for detecting fake news.
3. US10121025B1 - Request for attestation of authenticity of an article and reporting of same.
4. US20240126856A1 - Systems and methods for provenance and validation of electronic content.

Tips: Please Google the title of your proposed invention and go over the results.
Search the keywords from the title in the following Patent Databases:
Google Patents: https://patents.google.com
Google Scholar: https://scholar.google.com
Indian Patent Office: https://ipindiaservices.gov.in/publicsearch

- Do you feel that a person of "average" skill (not-extraordinary skill) in your area of technology would have arrived at your invention with existing knowledge in public domain? If no, what could be the reasons for the same?
No. A person of average skill in software engineering, machine learning, or blockchain systems may be familiar with isolated solutions such as text classification, digital ledgers, or news publishing interfaces. However, the present invention is not merely a simple aggregation of known parts. It requires a coordinated architecture in which credibility analysis, explanation generation, cryptographic registration, publication workflow, and later verification are intentionally linked for the specific problem of trust management in digital news.

The inventive contribution lies in the way the system converts an article into both a semantic credibility outcome and a tamper-evident verification record at the same publication stage, and then exposes that record back to end users for verification through a defined technical architecture. Existing public-domain knowledge typically treats these as separate domains or separate products. Therefore, the proposed invention would not ordinarily arise as a direct or automatic conclusion for a person of average skill without a focused inventive step toward integrated news trust architecture and a concrete technical implementation.

- Kindly provide broad workable ranges for all the parameters involved in your invention.
As the invention is software-based, the workable ranges are primarily configurable operational ranges rather than fixed mechanical dimensions. Broad workable ranges include:

1. Article input length:
- title length: approximately 3 to 30 words
- body content length: approximately 50 to 5000 or more words

2. Credibility scoring range:
- normalized credibility score: 0 to 100
- preferred operating range in one embodiment: 5 to 95

3. Classification threshold:
- configurable threshold for article labeling: 40 to 80
- preferred threshold in one embodiment: around 60 for classifying content as higher credibility

4. Confidence output:
- confidence range: 0.50 to 1.00 depending on scoring model or classifier output

5. Summary size:
- short-form summary length: approximately 20 to 80 words
- preferred summary length in one embodiment: about 36 words

6. Hashing parameters:
- cryptographic hash size: 128-bit to 512-bit secure hash families
- preferred embodiment: SHA-256

7. Storage and verification parameters:
- exact hash match verification
- optional combination of hash plus transaction identifier
- centralized, decentralized, or hybrid ledger deployment

8. Analysis engine variants:
- rule-based scoring only
- machine-learning-only classification
- hybrid rule-based plus machine-learning architecture

These ranges are illustrative and may be varied without departing from the inventive concept.

- References (if any)
1. Preliminary search references from Google Patents as listed above.
2. Internal project materials from the TezNews repository including architecture, workflow, blockchain, API, and ML documentation.
3. Any additional literature or patent references identified by DoR during formal prior-art review may be appended here.

- List Names and details of All Inventors (Full Names, Nationality and Addresses)
(An inventor may be a faculty member, Research Scholar, Student or staff associated with MUJ. Please list only those inventors who have intellectually contributed to the essential element of the invention. People whose services were paid for may be excluded from the list of inventors. In case of collaborative projects with inventors from institutions other than MUJ, a NOC from the Head of the collaborating institution must be obtained in advance with explicit written permission to file patent in the name of MUJ.)

Inventor 1:
Name: Parth Bajaj
Designation: Student
Department: CCE
Contact Details:
Email: parth.bajajs1946@gmail.com
phone number: [to be added]
Nationality: Indian
Address: [to be added]

Inventor 2:
Name: [to be added]
Designation: [to be added]
Department: [to be added]
Contact Details:
Email and phone number: [to be added]
Nationality: [to be added]
Address: [to be added]

(Include additional names and details of inventors as needed)

- Applicant Details (Full Names, Nationality and Addresses)
Name: [Please confirm whether applicant should be "Manipal University Jaipur" as per DoR process]
Nationality: [to be added]
Addresses: [to be added]

Manipal University Jaipur will be the Applicant for all IPR filed by MUJ Faculty and Staff

- Any additional notes or remarks.
1. This draft has been adapted for a software invention based on the TezNews project and is intended for internal DoR review.
2. The current text preserves the Form-B question structure and has been strengthened to describe the invention as a technical system and method rather than as a computer program per se.
3. Inventor details, corresponding faculty details, applicant details, submission date, and filing category should be updated before final submission.
4. A deeper patentability review is recommended before external filing because preliminary prior-art results show related work in fake-news detection and content attestation.
5. During final filing, the claims and specification should continue emphasizing technical architecture, component connectivity, implementation details, and technical effect.
