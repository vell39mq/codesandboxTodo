import { auth } from "../firebase";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { signOut } from "firebase/auth";
import { useState, useEffect } from "react";
import { db } from "../firebase";
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  query,
  updateDoc,
  where
} from "firebase/firestore";
import dayjs from "dayjs";

const Home = () => {
  const [todos, setTodos] = useState([]);
  const navigate = useNavigate();
  const { user } = useAuthContext();
  user && console.log(user.uid);

  const handleLogout = () => {
    signOut(auth);
    navigate("/login");
  };

  useEffect(() => {
    const todosCollectionRef = collection(db, "todos");
    const q = query(todosCollectionRef, where("userID", "==", user.uid));
    const unsub = onSnapshot(q, todosCollectionRef, (querySnapshot) => {
      setTodos(
        querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    });
    return unsub;
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { content, dueDate } = event.target.elements;
    console.log(content.value, dueDate.value);
    const todosCollectionRef = collection(db, "todos");
    const documentRef = await addDoc(todosCollectionRef, {
      content: content.value,
      dueDate: new Date(dueDate.value),
      isDone: false,
      userID: user.uid
    });
    console.log(documentRef);
  };

  const doneTodo = async (id) => {
    const todoDocumentRef = doc(db, "todos", id);
    await updateDoc(todoDocumentRef, {
      isDone: true
    });
  };

  if (!user) {
    return <Navigate to="/login" />;
  } else {
    return (
      <div>
        <h1>ホームページ</h1>
        <div className="userInfo">
          <p>こんにちは{user.email}さん</p>
          <button onClick={handleLogout}>ログアウト</button>
        </div>
        <div className="memberList">
          <h2>Your Todo</h2>
          {todos.map((todo, index) => (
            <div key={index} className={todo.isDone ? "doneItem" : ""}>
              <p>{todo.content}</p>
              {todo.userID}b{dayjs(todo.dueDate.toDate()).format("YYYY/MM/DD")}
              <button onClick={() => doneTodo(todo.id)}>Done</button>
            </div>
          ))}
        </div>
        <div className="addMember">
          <form onSubmit={handleSubmit}>
            <div>
              <h2>Add Todo</h2>
              <label>内容：</label>
              <input name="content" type="text" placeholder="例：掃除をする" />
            </div>
            <div>
              <label>期限：</label>
              <input name="dueDate" type="date" placeholder="yyyy/mm/dd" />
            </div>
            <div>
              <button>登録</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
};

export default Home;
