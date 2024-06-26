import { USER_ROLES } from "../config.js";
import { tickets } from "../mock/tickets.js";

const getTickets = (req, res) => {
  return res.json(tickets);
};

const createTicket = async (req, res) => {
  const { title, description } = req.body;
  const currentUser = req.user.username;

  if (!title || title.length > 30 || !/^[a-zA-Z0-9 ]+$/.test(title)) {
    return res.status(400).json({ error: "Invalid title" });
  }

  if (
    description &&
    (description.length > 200 || !/^[a-zA-Z0-9 ]+$/.test(description))
  ) {
    return res.status(400).json({ error: "Invalid description" });
  }

  const newTicket = {
    id: tickets.length + 1,
    title,
    description,
    status: "OPEN",
    createdAt: new Date(),
    updatedAt: new Date(),
    createdBy: currentUser,
  };

  tickets.push(newTicket);
  res.status(201).json(newTicket);
};

const updateTicket = async (req, res) => {
  const ticketId = parseInt(req.params.id);
  const { title, description, status } = req.body;
  const userRole = req.user.role;

  if (title && (title.length > 30 || !/^[a-zA-Z0-9 ]+$/.test(title))) {
    return res.status(400).json({ error: "Invalid title" });
  }

  if (
    description &&
    (description.length > 200 || !/^[a-zA-Z0-9 ]+$/.test(description))
  ) {
    return res.status(400).json({ error: "Invalid description" });
  }

  const ticketIndex = tickets.findIndex((ticket) => ticket.id === ticketId);
  if (ticketIndex === -1) {
    return res.status(404).json({ error: "Ticket not found" });
  }

  if (userRole === USER_ROLES.SUPPORT && status) {
    if (!["OPEN", "IN_PROGRESS", "CLOSED"].includes(status)) {
      return res.status(400).json({ error: "Invalid status" });
    }

    tickets[ticketIndex] = {
      ...tickets[ticketIndex],
      status,
      updatedAt: new Date(),
    };
  } else if (userRole === USER_ROLES.ADVERTISER && (title || description)) {
    if (status)
      return res.status(403).json({
        error: `${userRole} user is not allowed to update ticket status`,
      });

    tickets[ticketIndex] = {
      ...tickets[ticketIndex],
      title: title || tickets[ticketIndex].title,
      description: description || tickets[ticketIndex].description,
      updatedAt: new Date(),
    };
  } else {
    return res.status(403).json({
      error: `${userRole} user is not allowed to update ticket`,
    });
  }

  res.json(tickets[ticketIndex]);
};

const deleteTicket = (req, res) => {
  const ticketId = parseInt(req.params.id);

  const ticketIndex = tickets.findIndex((ticket) => ticket.id === ticketId);

  if (ticketIndex === -1) {
    return res.status(404).json({ error: "Ticket not found" });
  }

  tickets.splice(ticketIndex, 1);
  res.json({ message: "Ticket deleted successfully" });
};

export { getTickets, createTicket, updateTicket, deleteTicket };
