import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState = {
  pastes: localStorage.getItem("pastes")
    ? JSON.parse(localStorage.getItem("pastes"))
    : [],
};

export const pasteSlice = createSlice({
  name: "paste",
  initialState,
  reducers: {
    addToPastes: (state, action) => {
      const paste = action.payload;

      // add a check -> Paste alr exist case with same title
      const isExist = state.pastes.find((item) => item.title === paste.title);
      if (isExist) {
        toast.error("Title already exist");
        return;
      }

      state.pastes.push(paste);
      localStorage.setItem("pastes", JSON.stringify(state.pastes));
      console.log(state.pastes);
      toast("Paste created successfully");
    },
    updateToPastes: (state, action) => {
        const paste = action.payload;
        const index = state.pastes.findIndex((item) => item._id === paste._id);

        if (index >= 0) {
            // preserve createdAt if not provided
            state.pastes[index] = {
            ...state.pastes[index],
            ...paste,
            createdAt: state.pastes[index].createdAt,
            };

            localStorage.setItem("pastes", JSON.stringify(state.pastes));
            toast.success("Paste updated successfully");
        } else {
            toast.error("Paste not found");
        }
    },

    resetAllPastes: (state, action) => {},
    removeFromPastes: (state, action) => {
        const pasteId = action.payload;
        console.log(pasteId);
        const index = state.pastes.findIndex((item) => item._id === pasteId);
        if (index >= 0) {
          state.pastes.splice(index, 1);
          localStorage.setItem("pastes", JSON.stringify(state.pastes));
          toast("Paste deleted successfully");
        } 
        else {
          toast.error("Paste not found");
        }
    },
  },
});

// Action creators are generated for each case reducer function
export const { addToPastes, updateToPastes, resetAllPastes, removeFromPastes } =
  pasteSlice.actions;

export default pasteSlice.reducer;
