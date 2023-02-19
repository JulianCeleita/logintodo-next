import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { db } from "../firebase";

interface TodoType {
  id: string;
  title: string;
  completed: boolean;
}

interface FetchTodoReturnType {
  loading: boolean;
  error: string | null;
  todos: TodoType[] | any;
  setTodos: React.Dispatch<React.SetStateAction<TodoType[] | any>>;
}

export default function useFetchTodos(): FetchTodoReturnType {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [todos, setTodos] = useState<TodoType[] | null>(null);

  const { currentUser } = useAuth();

  useEffect(() => {
    async function fetchData() {
      try {
        if (currentUser) {
          const docRef = doc(db, "users", currentUser.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setTodos(docSnap.data().todos);
          } else {
            setTodos([]);
          }
        }
      } catch (err) {
        setError("Failed to load todos");
        console.log(err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [currentUser]);

  return { loading, error, todos, setTodos };
}
