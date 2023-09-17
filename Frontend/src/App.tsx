import { FormEvent, useState } from "react";
import "./App.css";
import {
  deleteRecord,
  fetchUsers,
  postRecord,
} from "./services/fetchFunctions";
import UserType from "./types/UserType";
import Cards from "./components/Cards/Cards";
import SearchBar from "./components/SearchBar/SearchBar";

function App() {
  const [query, setQuery] = useState<string>("");
  const [data, setData] = useState<UserType[]>([]);
  const [record, setRecord] = useState<File | null>(null);
  const [fileExtension, setFileExtention] = useState<string>("");
  const [isSended, setIsSended] = useState<Boolean>(false);
  const [textResponse, setTextResponse] = useState<string>("");

  const handleChange = (event: FormEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    setQuery(value);
  };

  const getData = async () => {
    const result: UserType[] = await fetchUsers(query);
    setData(result);
    setQuery("");
  };

  const handleFileChange = (event: FormEvent<HTMLInputElement>): void => {
    const selectedFile = event.currentTarget.files?.[0];
    const extension = selectedFile?.name.split(".")[1];

    setFileExtention(extension || "");

    if (selectedFile && extension === "csv") {
      setRecord(selectedFile);
    } else {
      setRecord(null);
    }
  };

  const handleClick = async () => {
    setIsSended(true);
    await postRecord(record);
    setTextResponse("File sended");

    setTimeout(() => {
      setIsSended(false);
    }, 3000);

    setRecord(null);
  };

  const handleDelete = async (user: UserType) => {
    const newData = data.filter((item) => item.id !== user.id);

    setData(newData);
    await deleteRecord(user);
  };

  return (
    <div className="App">
      <h1 className="hero-title">Personal Record</h1>

      <div className="record-container">
        <div className="record-div">
          <SearchBar
            query={query}
            getData={getData}
            record={record}
            handleChange={handleChange}
            handleFileChange={handleFileChange}
            handleClick={handleClick}
          />
        </div>

        <div className="send-text-response">
          {isSended && fileExtension === "csv" && <p>{textResponse}</p>}
        </div>

        <Cards data={data} handleDelete={handleDelete} />
      </div>
    </div>
  );
}

export default App;
