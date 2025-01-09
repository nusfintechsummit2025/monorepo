import React, { useState } from 'react';

const UploadData = ({ account }) => {
  const [file, setFile] = useState(null);
  const [csvContent, setCsvContent] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadResult, setUploadResult] = useState("");

  const SectionCard = ({ children, style }) => (
    <div style={{
      backgroundColor: "white",
      borderRadius: "12px",
      padding: "2rem",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      marginBottom: "2rem",
      width: "100%",
      maxWidth: "600px",
      ...style
    }}>
      {children}
    </div>
  );

  const Button = ({ children, onClick, style, disabled }) => (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        padding: "0.75rem 1.5rem",
        backgroundColor: disabled ? "#95a5a6" : "#3498DB",
        color: "white",
        border: "none",
        borderRadius: "6px",
        cursor: disabled ? "not-allowed" : "pointer",
        fontSize: "1.1rem",
        transition: "background-color 0.2s ease",
        width: "100%",
        marginTop: "1rem",
        ...style
      }}
      onMouseOver={(e) => !disabled && (e.target.style.backgroundColor = "#2980B9")}
      onMouseOut={(e) => !disabled && (e.target.style.backgroundColor = "#3498DB")}
    >
      {children}
    </button>
  );

  const LoadingSpinner = () => (
    <div style={{
      display: "inline-block",
      width: "20px",
      height: "20px",
      marginRight: "10px",
      border: "3px solid rgba(255,255,255,.3)",
      borderRadius: "50%",
      borderTopColor: "white",
      animation: "spin 1s ease-in-out infinite",
    }}>
      <style>
        {`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onload = (event) => {
        setCsvContent(event.target.result);
      };
      reader.readAsText(selectedFile);
    }
  };

  const handleUpload = () => {
    setIsUploading(true);
    setUploadResult("");

    // Demo delay 3-5 seconds
    const delay = Math.random() * 2000 + 3000;
    
    setTimeout(() => {
      setIsUploading(false);
      setUploadResult("Data successfully encrypted and uploaded to IPFS");
    }, delay);
  };

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      width: "100%",
      backgroundColor: "#f8f9fa",
      padding: "2rem",
      borderRadius: "12px"
    }}>
      <SectionCard style={{
        backgroundColor: "white",
        marginBottom: 0
      }}>
        <h3 style={{ color: "#2C3E50", marginBottom: "1.5rem", textAlign: "center" }}>
          Upload Your Health Data
        </h3>
        
        <div style={{ marginBottom: "1rem" }}>
          <label
            htmlFor="file-upload"
            style={{
              padding: "0.75rem 1.5rem",
              backgroundColor: "#3498DB",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontSize: "1.1rem",
              transition: "background-color 0.2s ease",
              display: "inline-block",
              width: "100%",
              boxSizing: "border-box",
              textAlign: "center"
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = "#2980B9"}
            onMouseOut={(e) => e.target.style.backgroundColor = "#3498DB"}
          >
            Choose File
          </label>
          <input
            id="file-upload"
            type="file"
            onChange={handleFileChange}
            accept=".csv"
            style={{ display: 'none' }}
          />
          <div style={{
            marginTop: "0.5rem",
            fontSize: "0.9rem",
            color: "#7F8C8D"
          }}>
            {file ? file.name : "No file selected"}
          </div>
        </div>

        {csvContent && (
          <div style={{
            marginTop: "1rem",
            padding: "0.75rem",
            backgroundColor: "#f1f1f1",
            borderRadius: "6px",
            maxHeight: "200px",
            overflow: "auto",
            fontSize: "0.9rem",
            whiteSpace: "pre-wrap",
            border: "1px solid #ddd"
          }}>
            <pre>{csvContent}</pre>
          </div>
        )}

        <div style={{ marginBottom: "1rem" }}>
          <div style={{ height: "18px" }}></div>
          <label>Secret Key (for encryption):</label>
          <input
            type="text"
            placeholder="Enter your secret key"
            style={{
              width: "100%",
              padding: "0.5rem",
              border: "1px solid #ddd",
              borderRadius: "6px",
              marginTop: "0.5rem",
              fontSize: "1rem",
              lineHeight: "1.5"
            }}
          />
        </div>

        <Button 
          onClick={handleUpload}
          disabled={isUploading}
        >
          {isUploading ? (
            <>
              <LoadingSpinner />
              Uploading & Encrypting...
            </>
          ) : (
            "Upload & Encrypt Data"
          )}
        </Button>

        {uploadResult && (
          <div style={{
            backgroundColor: "#d4edda",
            color: "#155724",
            padding: "1rem",
            borderRadius: "6px",
            marginTop: "1rem",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem"
          }}>
            <svg 
              viewBox="0 0 20 20"
              style={{
                width: "20px",
                height: "20px",
                fill: "currentColor"
              }}
            >
              <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"/>
            </svg>
            {uploadResult}
          </div>
        )}
      </SectionCard>
    </div>
  );
};

export default UploadData;