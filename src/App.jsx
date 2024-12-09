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
  const [AdityaBirlaElssFunds,setAdityaBirlaElssFunds] = useState([]); //holds all elss funds data of aditya birla
  const [AxisBankElssFunds,setAxisBankElssFunds] = useState([]);
  const [HDFCElssFunds,setHDFCElssFunds] = useState([]);
  const [ICICIElssFunds,setICICIElssFunds] = useState([]);
  const [KotakElssFunds,setKotakElssFunds] = useState([]);
  const [LicElssFunds,setLicElssFunds] = useState([]);
  const [MotilalElssFunds,setMotilalElssFunds] = useState([]);
  const [TataElssFunds,setTataElssFunds] = useState([]);
  const [AllElssFunds,setElssFunds] = useState({
    adityabirla:"",
    axisbank:"",
    hdfcbank:"",
    icicibank:"",
    kotak:"",
    lic:"",
    motilal:"",
    tata:""
  })
 


  useEffect(() => {
    
      const fetchSheetData =  async () => {
        const url =
          "https://docs.google.com/spreadsheets/d/e/2PACX-1vRhBDjJOL4rMKQCggItcQ7eybW_lLlyDalj5JFlCOU1MFCB4zIC7vontb_SlS2bqiLaFOdHTcK1VzEL/pub?output=csv";
        try {
          const response = await fetch(url);
          const csvText = await response.text();
          const result = Papa.parse(csvText, { header: true });
        
  
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
     

      const AdityaBirlaElssFundsData = async ()=>{
        const url = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQ30AQ0JuAntu-rZhB8BRMQYEORsqv0dRhGUV3wRizMti5nXXiS5lX7WeCqPh-g66m2MDhTeSctAeq7/pub?gid=1304174874&single=true&output=csv";

        try{
          const response = await fetch(url);
          const csvText = await response.text();
          const result = Papa.parse(csvText, { header: true });
          setAdityaBirlaElssFunds(result.data)
          setElssFunds((prev) => ({
            ...prev,
            adityabirla : result.data
          }))
        }
        catch(error){
          console.log("error fetching data:", error)
        }
      };


      const AxisBankElssFundsData = async ()=>{
        const url = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQ30AQ0JuAntu-rZhB8BRMQYEORsqv0dRhGUV3wRizMti5nXXiS5lX7WeCqPh-g66m2MDhTeSctAeq7/pub?gid=1730910392&single=true&output=csv";

        try{
          const response = await fetch(url);
          const csvText = await response.text();
          const result = Papa.parse(csvText, { header: true });
          setAxisBankElssFunds(result.data)
          setElssFunds((prev) => ({
            ...prev,
            axisbank : result.data
          }))
          
        }
        catch(error){
          console.log("error fetching data:", error)
        }
      };

      const HDFCElssFundsData  = async ()=>{
        const url = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQ30AQ0JuAntu-rZhB8BRMQYEORsqv0dRhGUV3wRizMti5nXXiS5lX7WeCqPh-g66m2MDhTeSctAeq7/pub?gid=1819662100&single=true&output=csv";

        try{
          const response = await fetch(url);
          const csvText = await response.text();
          const result = Papa.parse(csvText, { header: true });
          setHDFCElssFunds(result.data)
          setElssFunds((prev) => ({
            ...prev,
            hdfcbank : result.data
          }))
        }
        catch(error){
          console.log("error fetching data:", error)
        }
      };

      const ICICIElssFundsData  = async ()=>{
        const url = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQ30AQ0JuAntu-rZhB8BRMQYEORsqv0dRhGUV3wRizMti5nXXiS5lX7WeCqPh-g66m2MDhTeSctAeq7/pub?gid=1463954198&single=true&output=csv";

        try{
          const response = await fetch(url);
          const csvText = await response.text();
          const result = Papa.parse(csvText, { header: true });
          setICICIElssFunds(result.data)
          setElssFunds((prev) => ({
            ...prev,
            icicibank : result.data
          }))
        }
        catch(error){
          console.log("error fetching data:", error)
        }
      };

      const KotakElssFundsData  = async ()=>{
        const url = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQ30AQ0JuAntu-rZhB8BRMQYEORsqv0dRhGUV3wRizMti5nXXiS5lX7WeCqPh-g66m2MDhTeSctAeq7/pub?gid=775144288&single=true&output=csv";

        try{
          const response = await fetch(url);
          const csvText = await response.text();
          const result = Papa.parse(csvText, { header: true });
          setKotakElssFunds(result.data)
          setElssFunds((prev) => ({
            ...prev,
            kotak : result.data
          }))
        }
        catch(error){
          console.log("error fetching data:", error)
        }
      };

      const LicElssFundsData  = async ()=>{
        const url = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQ30AQ0JuAntu-rZhB8BRMQYEORsqv0dRhGUV3wRizMti5nXXiS5lX7WeCqPh-g66m2MDhTeSctAeq7/pub?gid=468594612&single=true&output=csv";

        try{
          const response = await fetch(url);
          const csvText = await response.text();
          const result = Papa.parse(csvText, { header: true });
          setLicElssFunds(result.data)
          setElssFunds((prev) => ({
            ...prev,
            lic : result.data
          }))
         
        }
        catch(error){
          console.log("error fetching data:", error)
        }
      };

      const MotilalElssFundsData  = async ()=>{
        const url = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQ30AQ0JuAntu-rZhB8BRMQYEORsqv0dRhGUV3wRizMti5nXXiS5lX7WeCqPh-g66m2MDhTeSctAeq7/pub?gid=669322833&single=true&output=csv";

        try{
          const response = await fetch(url);
          const csvText = await response.text();
          const result = Papa.parse(csvText, { header: true });
          setMotilalElssFunds(result.data)
          setElssFunds((prev) => ({
            ...prev,
            motilal : result.data
          }))
        }
        catch(error){
          console.log("error fetching data:", error)
        }
      };

      const TataElssFundsData  = async ()=>{
        const url = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQ30AQ0JuAntu-rZhB8BRMQYEORsqv0dRhGUV3wRizMti5nXXiS5lX7WeCqPh-g66m2MDhTeSctAeq7/pub?gid=2013014162&single=true&output=csv";

        try{
          const response = await fetch(url);
          const csvText = await response.text();
          const result = Papa.parse(csvText, { header: true });
          setTataElssFunds(result.data)
          setElssFunds((prev) => ({
            ...prev,
            tata : result.data
          }))
  
        }
        catch(error){
          console.log("error fetching data:", error)
        }
      };

      fetchSheetData();
      AdityaBirlaElssFundsData();
      AxisBankElssFundsData();
      HDFCElssFundsData();
      ICICIElssFundsData(); 
      KotakElssFundsData();
      LicElssFundsData();
      MotilalElssFundsData();
      TataElssFundsData();
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
      <MutualFund schemeCodes={schemeCodes} schemeNames={schemeNames} netAssetValues = {netAssetValues} AllElssFunds={AllElssFunds} AdityaBirlaElssFunds={AdityaBirlaElssFunds}/>

    </div>
  );
}

export default App;
