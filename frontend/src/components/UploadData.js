import React, { useState } from 'react';

const UploadData = ({ account }) => {
  const [file, setFile] = useState(null);
  const [csvContent, setCsvContent] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadResult, setUploadResult] = useState("");
  const [isMinting, setIsMinting] = useState(false);
  const [mintResult, setMintResult] = useState("");
  const [consent, setConsent] = useState(false);

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

  const handleMintTokens = () => {
    setIsMinting(true);
    setMintResult("");

    // Demo delay 2-4 seconds
    const delay = Math.random() * 2000 + 2000;
    
    // Generate a random token ID for demo
    const tokenId = `0x${Math.random().toString(16).slice(2, 6)}...${Math.random().toString(16).slice(2, 6)}`;
    
    setTimeout(() => {
      setIsMinting(false);
      setMintResult(`Successfully minted your data token ${tokenId}`);
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
        marginBottom: "2rem"
      }}>
        <h3 style={{ 
          color: "#2C3E50", 
          marginBottom: "1.5rem",
          textAlign: "center" 
        }}>
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

      {uploadResult && (
        <SectionCard style={{
          backgroundColor: "white",
          marginBottom: 0
        }}>
          <h3 style={{ 
            color: "#2C3E50", 
            marginBottom: "1.5rem",
            textAlign: "center" 
          }}>
            Mint & Share Your Data Token
          </h3>
          
          <div style={{
            backgroundColor: "#f8f9fa",
            padding: "1.5rem",
            borderRadius: "8px",
            marginBottom: "1.5rem",
            border: "1px solid #e9ecef"
          }}>
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              marginBottom: "0.5rem"
            }}>
              <input
                type="checkbox"
                id="consent-checkbox"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                style={{
                  width: "18px",
                  height: "18px"
                }}
              />
              <label
                htmlFor="consent-checkbox"
                style={{
                  fontSize: "1rem",
                  color: "#2C3E50",
                  fontWeight: "500"
                }}
              >
                Enable Data Sharing & Earn Rewards
              </label>
            </div>
            <p style={{
              color: "#7F8C8D",
              fontSize: "0.9rem",
              marginLeft: "24px"
            }}>
              By enabling data sharing, you authorize the use of your Data Token
              and start earning rewards from data queries.
            </p>
          </div>

          <Button 
            onClick={handleMintTokens}
            disabled={isMinting}
          >
            {isMinting ? (
              <>
                <LoadingSpinner />
                Minting Tokens...
              </>
            ) : (
              consent ? "Mint Token & Enable Sharing" : "Mint Token"
            )}
          </Button>

          {mintResult && (
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
                viewBox="0 0 24 24"
                style={{
                  width: "24px",
                  height: "24px",
                  fill: "currentColor"
                }}
              >
                <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 4.9c2.04 0 3.9 1.86 3.9 3.9s-1.86 3.9-3.9 3.9-3.9-1.86-3.9-3.9 1.86-3.9 3.9-3.9zm0 1.8c-1.17 0-2.1.93-2.1 2.1s.93 2.1 2.1 2.1 2.1-.93 2.1-2.1-.93-2.1-2.1-2.1z"/>
                <path d="M12 1L4.2 4.5v5.5c0 5.11 3.45 9.89 8.2 11.33 4.75-1.44 8.2-6.22 8.2-11.33V4.5L12 1zm0 2.9c-2.04 0-3.9 1.86-3.9 3.9s1.86 3.9 3.9 3.9 3.9-1.86 3.9-3.9-1.86-3.9-3.9-3.9zm0 1.8c1.17 0 2.1.93 2.1 2.1s-.93 2.1-2.1 2.1-2.1-.93-2.1-2.1.93-2.1 2.1-2.1z"/>
              </svg>
              <div style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.25rem"
              }}>
                <span>{mintResult}</span>
                <span style={{
                  fontSize: "0.9rem",
                  opacity: 0.8
                }}>
                  Your data is now tokenized and secure
                </span>
              </div>
            </div>
          )}
        </SectionCard>
      )}
    </div>
  );
};

export default UploadData;