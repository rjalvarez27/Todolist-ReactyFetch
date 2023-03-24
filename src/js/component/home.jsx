import React, { useState } from "react";


let Value = [];

const Home = () => {

	const [list, setList] = useState(Value);
	const [tasks, setTasks] = useState("");
	const [mistaken, setMistaken] = useState(false);


	const handleTasksChange = (event) => {
		setTasks(event.target.value);

	};
	const handleEnter = (event) => {
		if (event.key === "Enter") {
			const newValue = {
				nombre: tasks
			};
			const newlLisTask = [...list, newValue];
			setList(newlLisTask);
			setTasks("");
		};

	};

	const handleButton = () => {

		if (tasks.trim() === "") {
			setMistaken(true)
			return;
		}
		const newValue = {
			nombre: tasks
		};
		const newlLisTask = [...list, newValue];
		setList(newlLisTask);
		setTasks("");
	};


	const hadledRemove = (index) => {
		setList(list.filter((_, i) => index !== i))

	};

	return (

		<div className="container">
			<div className=" text-center text-opacity-75  display-1 m-3 ">todos</div>
			<div className="card border border-dark-subtle" >
				<div className="card-body d-flex justify-content-center gap-3 ">
					<input
					    className="rounded-2 col-10"
						value={tasks}
						type="text"
						placeholder="New Tasks"
						onChange={(event) => handleTasksChange(event)} 
						onKeyDown={(event) => handleEnter(event)}
					/>
					<button 
					className="btn btn-success"
					onClick={() => handleButton()} ><i className="fas fa-plus"></i></button>
				</div>
				<div>
					<h3 className="text-center">{tasks}</h3>
				</div>
				<div className="text-center">
					{list.length === 0 && <h2 className="text-secondary">No tasks, add a task</h2>}
					<ul className="list-group list-group-flush ">
						{list.map((producto, index) => {
							return (
								<li className="list-group-item d-flex justify-content-between" key={`${producto.nombre}-${index}`}>
									<h2 className="d-flex justify-content-start">{producto.nombre}</h2>
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
