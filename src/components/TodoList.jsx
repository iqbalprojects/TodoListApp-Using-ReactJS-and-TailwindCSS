import { data } from "autoprefixer";
import React, { useState, useEffect } from "react";

function TodoList() {
    const [text, setText] = useState("");
    const [newText, setNewText] = useState({});
    const [todos, setTodos] = useState([]);
    const [message, setMessage] = useState("");
    const [number, setNumber] = useState(1);

    useEffect(() => {
        text ? setMessage("") : setMessage("Silahkan Masukkan Activity:");
    }, [text]);

    let noId = number;
    let noList = 1;

    const saveData = (event) => {
        event.preventDefault();

        if (newText.id) {
            const todo = [...todos];
            const findIndex = todo.findIndex((data) => data.id == newText.id);
            todo[findIndex] = {
                id: newText.id,
                activity: text,
                check: newText.check,
            };
            setTodos([...todo]);
            return cancel();
        }
        if (!text) {
            setMessage("Data tidak boleh kosong!");
        } else {
            setTodos([...todos, { id: noId, activity: text, check: false }]);
            noId++;
            setNumber(noId);
            setText("");
        }
    };

    const deleteData = (id) => {
        setTodos(todos.filter((data) => data.id != id));
        if (text) {
            return cancel();
        }
    };

    const editData = (data) => {
        setNewText(data);
        setText(data.activity);
    };

    function cancel() {
        setText("");
        setNewText({});
    }

    function checkedHandler(data) {
        const todo = [...todos];
        const findIndex = todo.findIndex((item) => item.id == data.id);

        todo[findIndex] = {
            ...data,
            check: data.check ? false : true,
        };
        setTodos([...todo]);
    }

    return (
        <>
            <div className="container mx-auto bg-sky-500 rounded-sm py-3 max-w-4xl">
                <h1 className="text-center font-bold text-2xl my-8">
                    Todo List For My Productivity
                </h1>

                <div className="flex flex-col max-w-2xl bg-red-400 rounded-md mx-auto px-10 mb-14">
                    {<p className="mt-7 mb-2 text-lg">{message}</p>}
                    <form
                        action=""
                        className="flex justify-between mb-7"
                        onSubmit={saveData}
                    >
                        <input
                            className="rounded-md px-3 w-96"
                            type="text"
                            id="input"
                            value={text}
                            onChange={(value) => setText(value.target.value)}
                        />
                        <button className="px-5 py-2 bg-green-400 rounded-md font-bold">
                            {newText.id ? "Simpan" : "Tambah Data"}
                        </button>
                        {newText.id && (
                            <button
                                className="px-5 py-2 bg-green-400 rounded-md font-bold ml-2"
                                onClick={() => cancel()}
                            >
                                Batal
                            </button>
                        )}
                    </form>
                    <ol>
                        {todos.map((data) => {
                            return (
                                <li
                                    className="grid grid-cols-3 mb-6 items-center bg-yellow-300 rounded-md p-3"
                                    key={data.id}
                                >
                                    <div className="flex gap-3  col-span-2 text-left text-lg relative pl-10">
                                        <input
                                            className="h-5 w-5 self-center absolute left-0"
                                            type="checkbox"
                                            value={data.check}
                                            onChange={() =>
                                                checkedHandler(data)
                                            }
                                        />
                                        {noList++}. {data.activity}{" "}
                                        <span className="text-sky-600 font-semibold">
                                            {data.check
                                                ? "(Selesai)"
                                                : "(Belum Selesai)"}
                                        </span>
                                    </div>
                                    <div className="flex gap-2 justify-end">
                                        <button
                                            onClick={() => editData(data)}
                                            className="w-20 h-10 bg-green-400 rounded-md font-semibold"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() =>
                                                confirm(
                                                    "yakin ingin menghapus?"
                                                ) && deleteData(data.id)
                                            }
                                            className="w-20 h-10 bg-green-400 rounded-md font-semibold"
                                        >
                                            Hapus
                                        </button>
                                    </div>
                                </li>
                            );
                        })}
                    </ol>
                </div>
            </div>
        </>
    );
}

export default TodoList;
