import { tickets } from "../mock/tickets.js";

const createTicket = async (req, res) => {
  const { title, description } = req.body;

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
    createdBy: req.user.id,
  };

  tickets.push(newTicket);
  res.status(201).json(newTicket);
};

const updateTicket = async (req, res) => {
  const ticketId = parseInt(req.params.id);
  const { title, description, status } = req.body;
  const userType = req.user.type;

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

  // Check if the user is a Support user trying to update status
  if (userType === "Support" && status) {
    if (!["OPEN", "IN_PROGRESS", "CLOSED"].includes(status)) {
      return res.status(400).json({ error: "Invalid status" });
    }
    // Update status for Support users
    tickets[ticketIndex] = {
      ...tickets[ticketIndex],
      status,
      updatedAt: new Date(),
    };
  } else if (userType === "Advertiser" && (title || description)) {
    if (status)
      return res
        .status(403)
        .json({ error: "Advertisers are not allowed to update ticket status" });

    tickets[ticketIndex] = {
      ...tickets[ticketIndex],
      title: title || tickets[ticketIndex].title,
      description: description || tickets[ticketIndex].description,
      updatedAt: new Date(),
    };
  } else {
    return res
      .status(403)
      .json({ error: "Invalid operation for your user type" });
  }

  res.json(tickets[ticketIndex]);
};

export { updateTicket };
