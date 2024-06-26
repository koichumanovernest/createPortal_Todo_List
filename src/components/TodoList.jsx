import React, { useEffect, useState } from "react";
import Modal from "./UI/Modal";
import styled from "styled-components";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const url = "https://0eb92b2496a8fda4.mokky.dev/modal";

const TodoList = () => {
	const [todos, setTodos] = useState([]);
	const [input, setInput] = useState("");
	const [texit, setTexit] = useState("");
	const [modal, setModal] = useState(false);

	//! Get Todos
	const getTodos = async () => {
		const response = await fetch(url);
		const data = await response.json();
		setTodos(data);
	};

	//!Post Todos
	const postTodos = async () => {
		const newTodos = {
			image: input,
			texit: texit,
			completed: false,
		};
		const response = await fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(newTodos),
		});
		toast.promise(fetch(url), {
			pedding: "загруска ...",
			success: "Заиис успешно добавлено",
			autoClose: "1000",
		});

		await response.json();
		getTodos();
		setInput("");
		setTexit("");
	};
	//! Delete Todos
	const delteTodos = async (id) => {
		try {
			await fetch(`${url}/${id}`, {
				method: "DELETE",
			});
			getTodos();
			toast.promise(fetch(url), {
				pending: "Загрузка ...", // Ispravljena pravopisna greška
				success: "Задача успешно удалена", // Ispravljena pravopisna greška
				autoClose: 1000, // Ispravljena vrijednost na broj (ms)
			});
		} catch (error) {
			console.error(error);
		}
	};

	

	//! UseEffect
	useEffect(() => {
		getTodos();
	}, []);
	//! Modal function
	const handeleToggleModal = () => {
		setModal((prev) => !prev);
	};


	// ! return
	return (
		<div>
			<ToastContainer />
			<StyledButtonContainer>
				<StyledOpenModal onClick={handeleToggleModal}>Добавит</StyledOpenModal>
			</StyledButtonContainer>

			<div>
				{modal && (
					<Modal>
						<StyledModalContainer>
							<StyledModalContent>
								<StyledTexth1>Todo List</StyledTexth1>
								<StyledCloseModal onClick={handeleToggleModal}>
									❌
								</StyledCloseModal>
							</StyledModalContent>

							<StyledModalInputContainer>
								<StyledInput
									type="img"
									value={input}
									onChange={(e) => setInput(e.target.value)}
									placeholder="Image..."
								/>
								<StyledInput
									type="text"
									value={texit}
									onChange={(e) => setTexit(e.target.value)}
									placeholder="Text ..."
								/>
								<StyledAddTask onClick={postTodos}>Add Task</StyledAddTask>
							</StyledModalInputContainer>
						</StyledModalContainer>
					</Modal>
				)}
			</div>
			<StyledMapContainer>
				{todos?.map((item) => (
					<StyledMapContent key={item.id} >
			
							<>
								<StyledMapImg src={item.image} alt="" />
								<StyledMapText>{item.texit}</StyledMapText>
								<StyledDeleteButton onClick={() => delteTodos(item.id)}>
									delete
								</StyledDeleteButton>
							</>
							
					</StyledMapContent>
				))}
			</StyledMapContainer>
		</div>
	);
};

export default TodoList;

const StyledModalContent = styled.div`
	display: flex;

	justify-content: center;
	align-items: center;
	flex-direction: column;
`;
const StyledMapImg = styled.img`
	width: 355px;
	height: 300px;
	border: 2px solid white;
`;

const StyledCloseModal = styled.span`
	position: absolute;
	top: 10px;
	right: 20px;
	cursor: pointer;
`;
const StyledOpenModal = styled.button`
	background: #53f953;
	color: #ff00ff;
	border: none;
	width: 150px;
	height: 40px;
	border-radius: 5px;
	font-size: 17.5px;
	transition: background 0.3s;

	&:hover {
		background: #04c404;
	}
`;

const StyledButtonContainer = styled.div`
	display: flex;
	justify-content: end;
`;
const StyledModalContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	margin-top: 10px;
`;

const StyledModalInputContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 500px;
`;

const StyledDeleteButton = styled.button`
	padding: 10px 20px;
	text-transform: uppercase;
	border-radius: 8px;
	font-size: 17px;
	font-weight: 500;
	color: #ffffffca;
	text-shadow: none;
	background: transparent;
	cursor: pointer;
	box-shadow: transparent;
	border: 1px solid #39363680;
	transition: 0.5s ease;
	user-select: none;
	border: 2px solid #676565;
	&:hover,
	:focus {
		color: #ffffff;
		background: #008cff;
		border: 1px solid #008cff;
		text-shadow: 0 0 5px #ffffff, 0 0 10px #ffffff, 0 0 20px #ffffff;
		box-shadow: 0 0 5px #008cff, 0 0 20px #008cff, 0 0 50px #008cff,
			0 0 100px #008cff;
	}
`;

const StyledMapContainer = styled.div`
	display: flex;
	justify-content: center;
	flex-wrap: wrap;

	gap: 20px;
`;
const StyledMapContent = styled.div`
	display: flex;
	flex-direction: column;
	border: 1px solid white;
	
  /* ${(props) =>
    props.completed &&
    css`
      text-decoration: line-through;
    `} */
`;
const StyledMapText = styled.h1`
	color: white;
`;
const StyledInput = styled.input`
	background: none;
	border: none;
	outline: none;
	padding: 10px 20px;
	font-size: 16px;
	border-radius: 9999px;
	box-shadow: inset 2px 5px 10px rgb(5, 5, 5);
	color: #ff00ff;
	margin: 5px;
	/* width: 300px; */
`;
const StyledAddTask = styled.button`
	padding: 10px 20px;
	text-transform: uppercase;
	border-radius: 8px;
	font-size: 17px;
	width: 150px;

	font-weight: 500;
	color: #ff00ff;
	text-shadow: none;
	background: transparent;
	cursor: pointer;
	box-shadow: transparent;
	border: 1px solid #39363680;
	transition: 0.5s ease;
	user-select: none;
	border: 2px solid #676565;
	&:hover,
	:focus {
		color: #ffffff;
		background: #008cff;
		border: 1px solid #008cff;
		text-shadow: 0 0 5px #ffffff, 0 0 10px #ffffff, 0 0 20px #ffffff;
		box-shadow: 0 0 5px #008cff, 0 0 20px #008cff, 0 0 50px #008cff,
			0 0 100px #008cff;
	}
`;
const StyledTexth1 = styled.h1`
	color: purple;
`;
