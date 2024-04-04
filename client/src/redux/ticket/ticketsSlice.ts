import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TicketType } from "../../types/Ticket";

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
    createTicketStart(state) {
      state.isLoading = true;
      state.error = null;
    },
    createTicketSuccess(state, action: PayloadAction<TicketType>) {
      state.isLoading = false;
      state.tickets.push(action.payload);
    },
    createTicketFailure(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
    updateTicketStart(state) {
      state.isLoading = true;
      state.error = null;
    },
    updateTicketSuccess(state, action: PayloadAction<TicketType>) {
      state.isLoading = false;
      const updatedTicket = action.payload;
      const index = state.tickets.findIndex(
        (ticket) => ticket.id === updatedTicket.id
      );
      if (index !== -1) {
        state.tickets[index] = updatedTicket;
      }
    },
    updateTicketFailure(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
    deleteTicketStart(state) {
      state.isLoading = true;
      state.error = null;
    },
    deleteTicketSuccess(state, action: PayloadAction<number>) {
      state.isLoading = false;
      state.tickets = state.tickets.filter(
        (ticket) => ticket.id !== action.payload
      );
    },
    deleteTicketFailure(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {
  getTicketsStart,
  getTicketsSuccess,
  getTicketsFailure,
  createTicketStart,
  createTicketSuccess,
  createTicketFailure,
  updateTicketStart,
  updateTicketSuccess,
  updateTicketFailure,
  deleteTicketStart,
  deleteTicketSuccess,
  deleteTicketFailure,
} = ticketsSlice.actions;

export default ticketsSlice.reducer;
