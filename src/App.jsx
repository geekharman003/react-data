import { useEffect, useState } from "react";
import Papa from "papaparse";
import "./App.css";
import Header from "./components/Header";
import Features from "./components/Features";
import MutualFund from "./components/MutualFund";


function App() {
  const [data, setData] = useState([]); // Holds all the fetched data
  const [schemeCodes, setSchemeCodes] = useState([]); // Options for Scheme Code
  const [schemeNames, setSchemeNames] = useState([]); // All Scheme Names
  const [filteredSchemeNames, setFilteredSchemeNames] = useState([]); // Filtered Scheme Names
  const [netAssetValues, setNetAssetValues] = useState([]); // Holds all Net Asset Values
  const [selectedSchemeCode, setSelectedSchemeCode] = useState(null); // Selected Scheme Code
  const [selectedSchemeName, setSelectedSchemeName] = useState(null); // Selected Scheme Name
  const [selectedNetAssetValue, setSelectedNetAssetValue] = useState("N/A"); // Default to N/A
  const [selectedDate, setSelectedDate] = useState("N/A"); // Default to N/A


  useEffect(() => {
    
      const fetchSheetData =  async () => {
        const url =
          "https://docs.google.com/spreadsheets/d/e/2PACX-1vRhBDjJOL4rMKQCggItcQ7eybW_lLlyDalj5JFlCOU1MFCB4zIC7vontb_SlS2bqiLaFOdHTcK1VzEL/pub?output=csv";
        try {
          const response = await fetch(url);
          const csvText = await response.text();
          const result = Papa.parse(csvText, { header: true });
          // console.log(result.data.filter((item)=>{
          //   return item["Net Asset Value"]!==""
          // }
          // ))
  
          // Filter rows where Scheme Code contains the word "Fund"
          const validData = result.data.filter(
            (row) => row["Scheme Code"]?.toLowerCase().includes("fund")
          );
  
          // Extract Scheme Code options
          const schemeCodeOptions = validData.map((row) => ({
            value: row["Scheme Code"],
            label: row["Scheme Code"],
          }));
  
          // Extract all Scheme Names
          const allSchemeNames = result.data
            .map((row) => row["Scheme Name"])
            .filter((name) => name);
  
          // Extract all Net Asset Values and Dates
          const allData = result.data.filter((item)=>{
            return (
              item["Net Asset Value"]!==""
          )
          }
          )
  
  
          setData(validData); // Save all valid rows
          setSchemeCodes(schemeCodeOptions); // Save Scheme Code options
          setSchemeNames(allSchemeNames); // Save all Scheme Names
          setNetAssetValues(allData); // Save Net Asset Values and Dates
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
      fetchSheetData();
   
    
  }, []);

  const handleSchemeCodeChange = (selectedOption) => {
    setSelectedSchemeCode(selectedOption);

    if (!selectedOption) {
      setFilteredSchemeNames([]); // Reset filtered Scheme Names if no code is selected
      return;
    }

    const selectedCode = selectedOption.value;
    const firstWordFromCode = selectedCode.split(" ")[0].toLowerCase();

    const filteredNames = schemeNames
      .filter((schemeName) => {
        const firstWordFromName = schemeName
          ?.split("\n")[0]
          .split(" ")[0]
          .toLowerCase();
        return firstWordFromName.includes(firstWordFromCode);
      })
      .map((name) => ({ value: name, label: name }));

    setFilteredSchemeNames(filteredNames); // Update filtered Scheme Name options
  };

  const handleSchemeNameChange = (selectedOption) => {
    setSelectedSchemeName(selectedOption);

    if (!selectedOption) {
      setSelectedNetAssetValue("N/A"); // Reset to N/A
      setSelectedDate("N/A"); // Reset to N/A
      return;
    }

    const selectedName = selectedOption.value;

    const matchingRow = netAssetValues.find((row) => row.name === selectedName);

    setSelectedNetAssetValue(matchingRow?.value || "N/A");
    setSelectedDate(matchingRow?.date || "N/A");
  };

  return (
    
    <div className="app-container">
      {/* <div className="image-wrapper">
        <img
          width={"100%"}
          src="src/images/Invest-in-your-Future-with-Mutual-Funds--1536x636.png"
          alt="Invest in your Future"
        />
      </div> */}
      <Header />
      <Features />
      <MutualFund schemeCodes={schemeCodes} schemeNames={schemeNames} netAssetValues = {netAssetValues}/>

    
      

      {/* <div className="selectors-container">
        <h2>Select From a wide variety of choices</h2>
        <div id="selectors">
          <div className="selector">
          
            <label htmlFor="schemecode">Select Mutual Fund Scheme Code</label>
            <Select
              id="schemecode"
              options={schemeCodes}
              value={selectedSchemeCode}
              onChange={handleSchemeCodeChange}
              placeholder="Select a Scheme Code"
            />
          </div>
          <div className="selector">
          
            <label htmlFor="schemename">Select Filtered Scheme Name</label>
            <Select
              id="schemename"
              options={filteredSchemeNames}
              value={selectedSchemeName}
              onChange={handleSchemeNameChange}
              placeholder="Select a Scheme Name"
              isDisabled={!selectedSchemeCode}
            />
          </div>
        </div>
      </div>

   
      <div className="details-card">
        <h2>Fund Details</h2>
        <p>
          <strong>Net Asset Value:</strong> {selectedNetAssetValue}
        </p>
        <p>
          <strong>Date:</strong> {selectedDate}
        </p>
      </div> */}
    </div>
  );
}

export default App;
