import React, { useEffect, useState } from "react";


const initialValue = {
	label: "",
	done: false,
};

const urlBase = "http://assets.breatheco.de/apis/fake/todos/user/";
const apiUsername = "raul88";

const Home = () => {

	const [list, setList] = useState([]);
	const [tasks, setTasks] = useState(initialValue);
	const [mistaken, setMistaken] = useState(false);

	// Traer Tareas
	const fetchTodoApi = async () => {
		try {
			const response = await fetch(`${urlBase}${apiUsername}`)
			const data = await response.json();
			setList(data);
		} catch (error) {
			console.log(error)
		}
	}

	const handleTasksChange = (event) => {
		setTasks({ ...tasks, [event.target.name]: event.target.value });
	};


	// Enviar tareas a la api 
	const updateTasks = async (newlLisTask) => {
		try {
			const response = await fetch(`${urlBase}${apiUsername}`, {
				method: "PUT",
				headers: {
					"Content-type": "application/json"
				},
				body: JSON.stringify(newlLisTask),
			});
			if (response.ok === true) {
				fetchTodoApi();
			}
		} catch (error) {
			console.log(error);
		};
	};

	const handleEnter = (event) => {
		if (event.key === "Enter") {
			const newValue = tasks;
			const newlLisTask = [...list, newValue];
			updateTasks(newlLisTask);
			setTasks(initialValue);
		};


	};

	const handleButton = () => {

		if (tasks.label.trim() === "") {
			setMistaken(true)
			return;
		}
		const newValue = tasks;
		const newlLisTask = [...list, newValue];
		updateTasks(newlLisTask);
		setTasks(initialValue);
	};

	const hanledButtonRemove = () => {
		updateTasks([
			{
				label: "Make the bed",
				done: false,
			}
		]);
	};

	const hadledRemove = (id) => {
		let newlLisTask = list.filter((value, index) => index !== id);
		updateTasks(newlLisTask);
	};

	useEffect(() => {
		fetchTodoApi();
	}, [])

	return (

		<div className="container">
			<div className=" text-center text-opacity-75  display-1 m-3 ">todos</div>
			<div className="card border border-dark-subtle" >
				<div className="card-body d-flex justify-content-center gap-3 ">
					<input
						name="label"
						className="rounded-2 col-10"
						value={tasks.label}
						type="text"
						placeholder="New Tasks"
						onChange={(event) => handleTasksChange(event)}
						onKeyDown={(event) => handleEnter(event)}
					/>
					<button
						className="btn btn-success"
						onClick={() => handleButton()} ><i className="fas fa-plus"></i>
					</button>
				</div>
				<div className=" d-flex justify-content-center">
					<button
						className="btn btn-danger"
						onClick={() => hanledButtonRemove()} >Borrar Lista
					</button>
				</div>
				<div>
					<h3 className="text-center">{tasks.label}</h3>
				</div>
				<div className="text-center">
					{list.length === 0 && <h2 className="text-secondary">No tasks, add a task</h2>}
					<ul className="list-group list-group-flush ">
						{list.map((producto, index) => {
							return (
								<li className="list-group-item d-flex justify-content-between" key={`${producto}-${index}`}>
									<h2 className="d-flex justify-content-start">{producto.label}</h2>
									<button className="btn btn-danger d-flex justify-content-end text-center" onClick={() => hadledRemove(index)}><i className="fas fa-times align-self-center "></i></button>
								</li>
							);
						})}
					</ul>
				</div>
				<div className="card-footer text-muted">
					{mistaken && <h6 className="link-danger text-center">I miss entering values</h6>}
					{list.length} item left
				</div>



			</div>
		</div>

	);
};

export default Home;
