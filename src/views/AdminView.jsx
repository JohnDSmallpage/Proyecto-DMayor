import React,{useEffect,useState} from "react";
import { ApplicationCard } from "../components/applicationCard";
import { getApplications } from "../firebase models/user-service";



export function AdminView() {
const [applications,setApplications]=useState([]);
const [loading, setLoading] = useState(true);

const getSummary = async () => {
    const data = await getApplications();
    setApplications(data);
    setLoading(false);
  };

  useEffect(() => {
    getSummary();
  }, []);

  return (
    <div className="flex flex-wrap justify-evenly">
      {loading ? (
        <div>Cargando datos...</div>
      ) : applications?.length === 0 ? (
        <div>No hay aplicaciones en este momento</div>
      ) : (
          applications?.map((application, idx) => (
            <>
              <ApplicationCard info={application} key={idx}/>
            </>
          ))
        )}
      </div>
  )
}
