# Project Second

## 📌 Project Overview

This project is a **Machine Learning based prediction web application**.  
The goal of this project is to train a machine learning model using a dataset and provide predictions through a simple web interface.

Users can enter input values on the web page, and the system will process the data using a trained machine learning model to generate predictions.

The project demonstrates the **complete workflow of a data science application**, including data preprocessing, model training, backend integration, and frontend interaction.

---

# 🧠 What This Project Actually Does

This project performs the following tasks:

1. Loads a dataset for analysis.
2. Cleans and preprocesses the data.
3. Converts categorical variables into numerical values.
4. Trains a machine learning model using the dataset.
5. Saves the trained model.
6. Creates a web interface where users can enter input data.
7. Sends the input data to the trained model.
8. Displays the prediction result on the webpage.

In simple words:

User Input → Backend Processing → Machine Learning Model → Prediction → Result on Web Page

---

# ⚙️ Technologies Used

## Programming Language
- Python

Python is used for data processing, machine learning model development, and backend logic.

---

## Data Processing Libraries

### Pandas
Used for:
- loading datasets
- data cleaning
- data manipulation
- handling missing values

### NumPy
Used for:
- numerical operations
- handling arrays and matrices

---

## Machine Learning

### Scikit-learn

Used for:

- data preprocessing
- label encoding
- train-test splitting
- machine learning model training
- prediction

Example tools used from sklearn:

- LabelEncoder
- Train Test Split
- Machine Learning Models

---

## Backend Framework

### Flask

Flask is used to create the **backend server**.

The backend performs these tasks:

- receives input from the user
- processes the input data
- sends data to the machine learning model
- generates predictions
- returns results to the frontend

---

## Frontend Technologies

### HTML

Used to create the structure of the web page.

### CSS

Used to style the user interface.

### JavaScript (optional)

Used for better user interaction.

---

# 🔄 Project Workflow

## 1️⃣ Dataset Loading

The dataset is loaded using Pandas.

```python
df = pd.read_csv("dataset.csv")
```

---

## 2️⃣ Data Cleaning

The dataset is cleaned by removing:

- duplicate records
- missing values

```python
df = df.drop_duplicates()
df = df.dropna()
```

---

## 3️⃣ Data Encoding

Text values are converted into numbers so that machine learning models can understand them.

```python
from sklearn.preprocessing import LabelEncoder
le = LabelEncoder()
df['column'] = le.fit_transform(df['column'])
```

---

## 4️⃣ Feature and Target Selection

The dataset is divided into:

X → input features  
Y → target variable

```python
X = df.drop("target", axis=1)
y = df["target"]
```

---

## 5️⃣ Model Training

The machine learning model is trained using the processed dataset.

The model learns patterns from the data and uses them to make predictions.

---

## 6️⃣ Model Integration with Flask

The trained model is connected with the Flask backend.

The backend receives user input from the frontend and passes it to the model for prediction.

---

## 7️⃣ Prediction

The model generates predictions using:

```python
model.predict()
```

The result is then displayed to the user on the webpage.

---

# 📂 Project Structure

```
ProjectSecond
│
├── dataset
│   └── dataset.csv
│
├── templates
│   └── index.html
│
├── static
│   └── style.css
│
├── model.pkl
├── app.py
├── requirements.txt
└── README.md
```

---

# 🚀 Installation and Setup

## Clone the Repository

```bash
git clone https://github.com/anmolpanchal-dev/ProjectSecond.git
```

---

## Move to Project Directory

```bash
cd ProjectSecond
```

---

## Create Virtual Environment

```bash
python -m venv venv
```

---

## Activate Virtual Environment

Windows

```bash
venv\Scripts\activate
```

Mac / Linux

```bash
source venv/bin/activate
```

---

## Install Dependencies

```bash
pip install -r requirements.txt
```

---

# ▶️ Run the Project

```bash
python app.py
```

Then open your browser and go to:

```
http://127.0.0.1:5000
```

You will see the prediction interface.

---

# 📊 Learning Outcomes

This project demonstrates:

- Data preprocessing
- Feature engineering
- Machine learning model training
- Model deployment using Flask
- Integration of ML with a web interface

---

# 👨‍💻 Author

**Anmol Panchal**

Aspiring Data Scientist & Machine Learning Developer

GitHub  
https://github.com/anmolpanchal-dev