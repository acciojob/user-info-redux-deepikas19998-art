import React from "react";
import { createRoot } from "react-dom/client";
import { Provider, useDispatch, useSelector } from "react-redux";
import { configureStore, createSlice } from "@reduxjs/toolkit";

// Redux slice
const userSlice = createSlice({
  name: "user",
  initialState: {
    name: "",
    email: "",
  },
  reducers: {
    updateName: (state, action) => {
      state.name = action.payload;
    },
    updateEmail: (state, action) => {
      state.email = action.payload;
    },
  },
});

const { updateName, updateEmail } = userSlice.actions;

// Store
const store = configureStore({
  reducer: {
    user: userSlice.reducer,
  },
});

// React component
function App() {
  const dispatch = useDispatch();
  const { name, email } = useSelector((state) => state.user);

  return (
    <div>
      <h1>User Information</h1>

      <input
        type="text"
        placeholder="Enter name"
        value={name}
        onChange={(e) => dispatch(updateName(e.target.value))}
      />

      <input
        type="email"
        placeholder="Enter email"
        value={email}
        onChange={(e) => dispatch(updateEmail(e.target.value))}
      />

      <div className="output">
        <p>Name - {name}</p>
        <p>Email - {email}</p>
      </div>
    </div>
  );
}

// Render
const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
