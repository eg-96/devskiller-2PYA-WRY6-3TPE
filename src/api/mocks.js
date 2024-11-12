export const mockConferenceTalk = (overrides = {}) => ({
  id: "1",
  title: "Talk 1",
  speaker: "Speaker 1",
  category: "Category 1",
  ...overrides,
});

export const mockCallForPapers = (overrides = {}) => ({
  byTalkId: {
      "1": { status: "accepted" },
      "2": { status: "rejected" },
      ...overrides,
  },
});

export const mockConferenceTalkProposal = (overrides = {}) => ({
  id: "any-id",
  title: "Any Title",
  speaker: "Any Speaker",
  category: "any category",
  status: "accepted",
  ...overrides,
});

export const mockConferenceTalkDetails = (overrides = {}) => ({
  id: "any-id",
  title: "Any Title",
  speaker: "Any Speaker",
  category: "any category",
  description: "any description",
  ...overrides,
});