import { downloadExcel } from "react-export-table-to-excel";
import { get, ref } from "firebase/database";
import DownloadIcon from "@mui/icons-material/Download";
import { database } from "../Uitls/Config";
import { useState, useEffect } from "react";
import { Button } from "@mui/material";
export default function ExcelDownloadButton() {
  const [data, setData] = useState([]);
  const header = [
    "Id",
    "Data",
    "Bangalore",
    "Hassan",
    "Mandya",
    "Mysore",
    "Tumkur",
    "Yadavakote",
  ];
  const userRef = ref(database, "Data");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const snapshot = await get(userRef);
        if (snapshot.exists()) {
          const userArray = Object.entries(snapshot.val()).map(
            ([id, data]) => ({
              id,
              data: data.data,
              Bangalore: data.gData?.Bangalore || 0,
              Hassan: data.gData?.Hassan || 0,
              Mandya: data.gData?.Mandya || 0,
              Mysore: data.gData?.Mysore || 0,
              Tumkur: data.gData?.Tumkur || 0,
              Yadavakote: data.gData?.Yadavakote || 0,
            })
          );
          setData(userArray);
        } else {
          console.log("No Data");
          setData([]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setData([]);
      }
    };

    fetchData();
  }, [userRef]);
  const handleDownloadExcel = () => {
    downloadExcel({
      fileName: "Report",
      tablePayload: {
        header,
        body: data,
      },
    });
  };
  return (
    <Button
      variant="outlined"
      endIcon={<DownloadIcon />}
      onClick={handleDownloadExcel}
    >
      Download
    </Button>
  );
}
