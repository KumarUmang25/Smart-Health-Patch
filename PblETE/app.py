import streamlit as st
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from sklearn.metrics import confusion_matrix
from xgboost import XGBClassifier

# =========================
# Title
# =========================
st.title("Toxicity Detection System")
st.write("Predict toxicity based on RGB biomarker signals")

# =========================
# Load Data
# =========================
df = pd.read_csv("synthetic_toxicity_dataset_10000.csv")

X = df.drop("toxicity", axis=1)
y = df["toxicity"]

# Encode labels
le = LabelEncoder()
y_encoded = le.fit_transform(y)

# Train model
X_train, X_test, y_train, y_test = train_test_split(
    X, y_encoded, test_size=0.2, stratify=y_encoded, random_state=42
)

model = XGBClassifier(n_estimators=200, max_depth=5)
model.fit(X_train, y_train)

y_pred = model.predict(X_test)

y_test_decoded = le.inverse_transform(y_test)
y_pred_decoded = le.inverse_transform(y_pred)

# =========================
# Sidebar Input
# =========================
st.sidebar.header("🔬 Enter Sensor RGB Values")

inputs = []
for feature in X.columns:
    val = st.sidebar.slider(feature, 0, 255, 128)
    inputs.append(val)

# Prediction Button
if st.sidebar.button("Predict Toxicity"):
    pred = model.predict(np.array(inputs).reshape(1, -1))
    label = le.inverse_transform(pred)[0]
    
    if label == "Low":
        st.sidebar.success(f"Prediction: {label}")
    elif label == "Medium":
        st.sidebar.warning(f"Prediction: {label}")
    else:
        st.sidebar.error(f"Prediction: {label}")

# =========================
# Dashboard Section
# =========================

# Class Distribution
st.subheader("Class Distribution")
st.bar_chart(df["toxicity"].value_counts())

# Confusion Matrix
st.subheader("Confusion Matrix")

cm = confusion_matrix(y_test_decoded, y_pred_decoded)

fig, ax = plt.subplots()
ax.imshow(cm)

classes = ["Low", "Medium", "High"]
ax.set_xticks(np.arange(len(classes)))
ax.set_yticks(np.arange(len(classes)))
ax.set_xticklabels(classes)
ax.set_yticklabels(classes)

for i in range(len(classes)):
    for j in range(len(classes)):
        ax.text(j, i, cm[i, j], ha="center", va="center")

st.pyplot(fig)

# Feature Importance
st.subheader("Feature Importance")

importances = model.feature_importances_
indices = np.argsort(importances)

fig2, ax2 = plt.subplots()
ax2.barh(X.columns[indices], importances[indices])

st.pyplot(fig2)