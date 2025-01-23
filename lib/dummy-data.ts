export const leaveTypes = [
  { label: "Annuel", value: "ANNUAL" },
  { label: "Santé", value: "HEALTH" },
  { label: "Études", value: "STUDY" },
  { label: "Familial", value: "FAMILY" },
  { label: "Maternité", value: "MATERNITY" },
  { label: "Paternité", value: "PATERNITY" },
  { label: "Sans solde", value: "UNPAID" },
] as const;

export const orgDepartments = [
  { label: "Finance", id: "1ea40bcd-b285-4405-84be-c5591c62dfd2", desc: "Gère les finances", users: [] },
  { label: "Technologie", id: "687d77fe-dfc1-4380-a1c5-3d2e30b1f42f", desc: "Développe des logiciels", users: [] },
  { label: "Ressources humaines", id: "85c738e2-65ac-4a53-8ad1-2cb6cf43d3b4", desc: "Gère les questions humaines", users: [] },
  { label: "Opérations", id: "843e8109-d4b8-4323-9433-2554e1704e7c", desc: "Gère les opérations", users: [] },
  { label: "Produit", id: "39707d6f-4aba-4f49-8039-68e95b6f5e4e", desc: "Gère le développement des produits", users: [] },
] as const;

export const orgTitles = [
  { label: "PDG", id: "b8bcdc18-3c95-4a28-b378-df811619580e", desc: "Gère les finances", subordinates: [] },
  { label: "Développeur Senior", id: "68100e6a-5651-4e2e-a188-749eed93cda3", desc: "Développe des logiciels", subordinates: [] },
  { label: "Responsable RH", id: "d65fff39-2a43-4018-a219-f46ca1db8153", desc: "Gère les questions humaines", subordinates: [] },
  { label: "Responsable des opérations", id: "b775b1fe-f9c1-41f7-96b3-44024add621a", desc: "Gère les opérations", subordinates: [] },
  { label: "Chef de produit", id: "b723765a-da0e-4065-b858-74cb915bdc44", desc: "Gère le développement des produits", subordinates: [] },
] as const;

export const UserRoles = [
  "ADMIN",
  "USER",
  "MODERATOR",
] as const;

export const leaveStatus = [
  "APAPPROUVÉ",
  "ATTENTE",
  "MODÉRATION",
  "REJETÉ",
] as const;

export const userLeaveBalances = [
  {
      year: "2023",
      leaveType: "ANNUAL",
      credit: 22,
      used: 19,
      balance: 3
  },
  {
      year: "2023",
      leaveType: "HEALTH",
      credit: 15,
      used: 5,
      balance: 10
  },
  {
      year: "2023",
      leaveType: "MATERNITY",
      credit: 20,
      used: 8,
      balance: 12
  },
  {
      year: "2023",
      leaveType: "STUDY",
      credit: 10,
      used: 3,
      balance: 7
  },
  {
      year: "2023",
      leaveType: "FAMILY",
      credit: 18,
      used: 6,
      balance: 12
  },
  {
      year: "2023",
      leaveType: "PATERNITY",
      credit: 12,
      used: 4,
      balance: 8
  },
  {
      year: "2023",
      leaveType: "UNPAID",
      credit: 0,
      used: 5,
      balance: -5
  }
];

export const leaveHistory = [
  {
      id: 1,
      user: 'Mary Jones',
      type: "ANNUAL",
      createdAt: "2023-09-20T20:33:29.000Z",
      startDate: "2023-10-07T00:00:00.000Z",
      endDate: "2023-10-10T00:00:00.000Z",
      days: 3,
      status: "APPRÉVÉ",
      notes: "Il vous reste 5 jours sur votre solde",
      updatedAt: "2023-09-20T20:40:29.000Z",
      updatedBy: "Joe Doe"
  },
  {
      id: 2,
      user: 'Cherly Mathews',
      type: "HEALTH",
      createdAt: "2023-09-20T20:33:29.000Z",
      startDate: "2023-01-07T00:00:00.000Z",
      endDate: "2023-01-07T00:00:00.000Z",
      days: 1,
      status: "APPRÉVÉ",
      notes: "Apportez un certificat médical du médecin",
      updatedAt: "2023-09-20T20:33:29.000Z",
      updatedBy: "Joe Doe"
  },
  {
      id: 3,
      user: 'Mary Jones',
      type: "STUDY",
      createdAt: "2023-09-20T20:33:29.000Z",
      startDate: "2023-10-07T00:00:00.000Z",
      endDate: "2023-10-07T00:00:00.000Z",
      days: 6,
      status: "ATTENTE",
      notes: "",
      updatedAt: "2023-09-20T20:33:29.000Z",
      updatedBy: "Joe Doe"
  },
  {
      id: 4,
      user: 'Shyleen Marsh',
      type: "FAMILY",
      createdAt: "2023-09-20T20:33:29.000Z",
      startDate: "2023-11-03T00:00:00.000Z",
      endDate: "2023-11-07T00:00:00.000Z",
      days: 4,
      status: "PRÉ-APPRÉVÉ",
      notes: "Attendez de voir ce que dit le responsable",
      updatedAt: "2023-09-20T20:33:29.000Z",
      updatedBy: "Joe Doe"
  },
  {
      id: 5,
      user: 'Moses Phiri',
      type: "MATERNITY",
      createdAt: "2023-09-20T20:33:29.000Z",
      startDate: "2023-10-07T00:00:00.000Z",
      endDate: "2023-10-07T00:00:00.000Z",
      days: 5,
      status: "APPRÉVÉ",
      notes: "Prenez soin de vous",
      updatedAt: "2023-09-20T20:33:29.000Z",
      updatedBy: "Joe Doe"
  },
  {
      id: 6,
      user: 'Wanguda',
      type: "PATERNITY",
      createdAt: "2023-08-20T20:33:29.000Z",
      startDate: "2023-10-17T00:00:00.000Z",
      endDate: "2023-10-27T00:00:00.000Z",
      days: 10,
      status: "ATTENTE",
      notes: "",
      updatedAt: "2023-08-20T20:33:29.000Z",
      updatedBy: " "
  },
  {
      id: 7,
      user: 'De Mawo',
      type: "UNPAID",
      createdAt: "2023-02-20T20:33:29.000Z",
      startDate: "2023-03-01T00:00:00.000Z",
      endDate: "2023-03-07T00:00:00.000Z",
      days: 7,
      status: "REJETÉ",
      notes: "Tu n'as pas assez de temps",
      updatedAt: "2023-02-21T20:33:29.000Z",
      updatedBy: "Jane Smith"
  }
];
