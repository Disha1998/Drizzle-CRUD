import Image from "next/image";
import TodoList from "./todo/page";

export default function Home() {
  console.log('---here in console');

  return (
    <>
      <TodoList />
    </>
  );
}
