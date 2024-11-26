## **Emerging Technology Assignment - Ross Hannon G00381859**

This `README.md` file serves as a guide to navigating my assignment on building a **Trigram Model** and creating an **ELIZA Chatbot**. For any questions or clarifications, feel free to contact me at **rosshannonty@gmail.com**.

---

## **Table of Contents**

- [Overview](#overview)  
- [Introduction](#introduction)  
- [Key Sections in Assignment (`trigrams.ipynb`)](#key-sections-in-assignment-trigramsipynb)  
- [ELIZA Chatbot Project](#eliza-chatbot-project)  
- [References](#References)
- [Getting Started](#getting-started)  

---

## **Overview**

This repository contains two main components of the Emerging Technology module:
1. A **Trigram Model**: A statistical model to analyze sequences of three characters in texts.
2. An **ELIZA Chatbot**: A chatbot simulating human interaction, based on pattern matching and response templates.

Both projects explore advanced computational techniques and applications in modern technology.

---

## **Introduction**

### **Trigram Model**  
A **trigram** is a sequence of three characters. Trigram models are used to analyze and predict text patterns. In this project, I build a trigram model from classic texts sourced from **Project Gutenberg**.

### **ELIZA Chatbot**  
The **ELIZA chatbot** is a simple yet powerful simulation of human conversation. It uses pattern recognition and substitution to provide responses that mimic human interaction.

This project aims to demonstrate foundational techniques in text analysis and basic AI-driven conversations.

---

## **Key Sections in Assignment (`trigrams.ipynb`)**

### **1. Task 1: Building a Trigram Model**  
- Downloading and cleaning text from **Project Gutenberg**.  
- Constructing a **third-order letter approximation**.  
- Creating a frequency-based trigram model.  

### **2. Task 2: Trigram Text Generation**  
- Generating 10,000-character text based on the trigram model.  
- Using probabilities derived from trigrams to generate realistic text.  

### **3. Task 3: Model Analysis**  
- Analyzing generated text for valid **English words**.  
- Comparing the generated text with a predefined English dictionary (`words.txt`).  

### **4. Task 4: Exporting Model**  
- Exporting the trigram model as a **JSON file** for further analysis and reuse.  

---

## **ELIZA Chatbot Project**
## Link to Chatbot: https://rosshannon7677.github.io/EmergingTechnologyRossH/eliza/

### **Project Description**  
The ELIZA chatbot simulates a therapist interacting with users. This implementation includes:
- **Pattern matching** for generating responses.
- **Sentiment analysis** to detect user emotions (positive, negative, or neutral).
- **Reflection** to personalize responses using user inputs.

### **Key Features**:
- Sentiment-based responses.
- Customizable conversation patterns.
- Real-time interaction via a clean, user-friendly interface.

### **Project Structure**:
- **`index.html`**: Main webpage for the chatbot.  
- **`style.css`**: Stylesheet for improving the interface design.  
- **`eliza.js`**: JavaScript logic for handling user inputs and generating chatbot responses.  

---

### **References**:

T1: Buidling a Trigram Model

Understanding what are N-Grams: https://towardsdatascience.com/understanding-word-n-grams-and-n-gram-probability-in-natural-language-processing-9d9eef0fa058

T2: Generating Text Using the Trigram Model

Random choices selection: Generate pseudo-random numbers https://docs.python.org/3/library/random.html#random.choices

T3: Analyzing the Generated Text for Valid Words


T4: Exporting the Model as JSON

Saving a dictionary to a JSON file in Python https://stackoverflow.com/questions/12309269/saving-dictionary-to-a-json-file-in-python


## **Getting Started**

To run the projects in this repository, follow these steps:

### **1. Clone the Repository**
```bash
git clone https://github.com/rosshannon7677/EmergingTechnologyRossH.git
cd EmergingTechnologyRossH
