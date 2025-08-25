export const USAGE_HISTORY = [
  {
    period: "Today's Usage",
    total: "5.3kW"
  },
  {
    period: "July 32, 2025",
    total: "1.5kW"
  },
  {
    period: "July 32, 2025",
    total: "4.7kW"
  },
  {
    period: "July 32, 2025",
    total: "2.47kW"
  },
  {
    period: "July 32, 2025",
    total: "8.12kW"
  },
  {
    period: "July 32, 2025",
    total: "6.0kW"
  },
  {
    period: "July 32, 2025",
    total: "1.9kW"
  },
  {
    period: "July 32, 2025",
    total: "3.3kW"
  },
  {
    period: "July 32, 2025",
    total: "2.5kW"
  },
  {
    period: "July 32, 2025",
    total: "5.3kW"
  },
  {
    period: "July 32, 2025",
    total: "9.8kW"
  },
  {
    period: "July 32, 2025",
    total: "11.7kW"
  },
  {
    period: "July 32, 2025",
    total: "52.1kW"
  }
];

export const NOTIFICATIONS_ALERTS = [
  {
    title: "Planned power outage",
    time: "8:30 AM"
  },
  {
    title: "Planned maintenance",
    time: "8:30 AM"
  },
  {
    title: "Planned restoration time",
    time: "8:30 AM"
  },
  {
    title: "Planned power outage",
    time: "8:30 AM"
  },
  {
    title: "Planned power outage",
    time: "8:30 PM"
  }
];

export const COMPLAINTS_SUPPORT = [
  {
    title: "I have units available but no supply",
    time: "8:30 AM"
  },
  {
    title: "Our transformer exploded",
    time: "8:30 AM"
  },
  {
    title: "We have a fallen electric pole",
    time: "8:30 AM"
  }
];

// Chart data for Electricity Demand & Supply
export const demandSupplyData = {
  labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  datasets: [
    {
      label: "Expected supply",
      data: [20, 40, 60, 80, 120, 60, 20],
      borderColor: "#f44336",
      backgroundColor: "rgba(144,133,160,0.25)",
      fill: true,
      tension: 0.4,
      pointRadius: 0,
      borderWidth: 2,
      order: 2
    },
    {
      label: "Actual supply",
      data: [10, 25, 35, 50, 70, 30, 10],
      borderColor: "#4caf50",
      backgroundColor: "rgba(76,175,80,0.25)",
      fill: true,
      tension: 0.4,
      pointRadius: 0,
      borderWidth: 2,
      order: 3
    },
    {
      label: "", // Faint blue background line
      data: [100, 90, 80, 70, 60, 80, 100],
      borderColor: "#90caf9",
      backgroundColor: "rgba(0,0,0,0)",
      fill: false,
      borderWidth: 2,
      borderDash: [5, 5],
      pointRadius: 0,
      tension: 0.4,
      order: 1
    }
  ]
};

export const demandSupplyOptions = (color: string) => ({
  plugins: {
    legend: {
      display: true,
      labels: {
        color: color,
        font: { size: 14 },
        filter: (legendItem: { text: string }) => legendItem.text !== "" // Hide faint blue line from legend
      }
    },
    tooltip: {
      mode: "index",
      intersect: false
    }
  },
  scales: {
    x: {
      ticks: { color: color, font: { size: 12 } },
      grid: { color: "#eee" }
    },
    y: {
      min: 0,
      max: 130,
      ticks: { color: color, font: { size: 12 } },
      grid: { color: "#eee" }
    }
  }
});

export const transferHistory = [
  {
    title: "Sent to MTR-78854125",
    subTitle: "August 10, 2015",
    unit: "50kWh",
    amount: "₦10,000",
    status: "Successful",
    statusColor: "#12B76A"
  },
  {
    title: "Sent to MKT-45578120",
    subTitle: "July 6, 2015",
    unit: "65kWh",
    amount: "₦13,000",
    status: "Successful",
    statusColor: "#12B76A"
  },
  {
    title: "Sent to MKT-45578120",
    subTitle: "July 6, 2015",
    unit: "10kWh",
    amount: "₦22,000",
    status: "Pending",
    statusColor: "#FF8000"
  },
  {
    title: "Sent to MKT-45578120",
    subTitle: "July 6, 2015",
    unit: "30kWh",
    amount: "₦7,500",
    status: "Successful",
    statusColor: "#12B76A"
  }
];

export const recentNotifications = [
  {
    subject: "Low Balance Warning",
    message: "Your account balance is below $10 Consider recharging soon.",
    time: "2 hour ago",
    icon: "bi-check2-circle",
    color: "#12B76A"
  },
  {
    subject: "Payment Successful",
    message: "Your payment of $50.00 has been proccessed successfully.",
    time: "1 day ago",
    icon: "bi-exclamation-triangle",
    color: "#ffb900"
  },
  {
    subject: "Maintenance Notice",
    message: "Scheduled maintenance on Feb 5th from 2-4 AM. Brief service interruption expected.",
    time: "3 days ago",
    icon: "bi-bell",
    color: "#0084FF"
  },
];

export const tickets = [
  {
    subject: "My Support Tickets",
    title: "Billing Discrepancy",
    ticketId: "Ticket # 49485",
    message: "Issue with January billing amount...",
    date: "Created: Aug. 20, 2025",
    status: "In progress",
    color: "#DF7700"
  },
  {
    subject: "Meter Reading Error",
    title: "Billing Discrepancy",
    ticketId: "Ticket # 25548879",
    message: "Smart meter showing incorrect readings...",
    date: "Created: Aug. 25, 2025",
    status: "Resolved",
    color: "#008724"
  },
  {
    subject: "Unit Rejection",
    title: "Unverified Unit",
    ticketId: "Ticket # 25540009",
    message: "Smart meter showing incorrect readings...",
    date: "Created: Aug. 20, 2025",
    status: "Pending",
    color: "#848484"
  },
  {
    subject: "Meter Reading Error",
    title: "Blocked Meter",
    ticketId: "Ticket # 47848879",
    message: "Smart meter showing blocked",
    date: "Created: Aug. 20, 2025",
    status: "Unattended",
    color: "#DB0000"
  },
]
