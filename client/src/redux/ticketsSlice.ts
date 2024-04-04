import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TicketType } from "../types/Ticket";

interface TicketsState {
  tickets: TicketType[];
  isLoading: boolean;
  error: string | null;
}

const initialState: TicketsState = {
  tickets: [],
  isLoading: false,
  error: null,
};

const ticketsSlice = createSlice({
  name: "tickets",
  initialState,
  reducers: {
    getTicketsStart(state) {
      state.isLoading = true;
      state.error = null;
    },
    getTicketsSuccess(state, action: PayloadAction<TicketType[]>) {
      state.isLoading = false;
      state.tickets = action.payload;
    },
    getTicketsFailure(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const { getTicketsStart, getTicketsSuccess, getTicketsFailure } =
  ticketsSlice.actions;
export default ticketsSlice.reducer;
