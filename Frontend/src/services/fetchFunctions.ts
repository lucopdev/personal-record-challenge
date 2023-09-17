import UserType from "../types/UserType";

const fetchUsers = async (query: string) => {
  try {
    const URL = `http://127.0.0.1:3001/api/users?q=${query}`;
    const response = await fetch(URL);
    const data = await response.json();
    return data;
  } catch(e) {
    throw new Error('There is no response from API');
  }
};

const postRecord = async (record: File | null) => {
  if (!record) {
    return null;
  }

  try {
    const URL = 'http://127.0.0.1:3001/api/file';
    const formData = new FormData();
    formData.append('csvFile', record);
  
    const response = await fetch(URL, {
      method: 'POST',
      body: formData,
    });
  
    if (!response.ok) {
      throw new Error('Erro ao enviar o arquivo.');
    }
  
    const data = await response.json();
    
    return data;
  } catch(e) {
    throw new Error('There is no response from API');  
  }
};

const deleteRecord = async (user: UserType) => {
  if (!user) {
    return null;
  }
  
  try {
    const URL = 'http://127.0.0.1:3001/api/file';
    
    await fetch(URL, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user) as unknown as BodyInit | null | undefined,
    });
  } catch(e) {
    throw new Error('There is no response from API');  
  }
};

export {
  fetchUsers,
  postRecord,
  deleteRecord,
};