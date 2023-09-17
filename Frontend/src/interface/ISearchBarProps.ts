import { FormEvent } from "react";

interface ISearchBarProps {
  query: string,
  getData: () => void,
  record: File | null,
  handleChange: (event: FormEvent<HTMLInputElement>) => void,
  handleFileChange: (event: FormEvent<HTMLInputElement>) => void,
  handleClick: () => void,
}

export default ISearchBarProps;