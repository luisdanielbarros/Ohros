import { createSlice } from "@reduxjs/toolkit";

const worldBuildingSlice = createSlice({
  name: "worldBuilding",
  initialState: {
    Type: 0,
    Id: 0,
    Concept: "",
    reasonOfConcept: "",
    Title: "",
    Summary: "",
    Description: "",
    Cause: "",
    Purpose: "",
    Myth: "",
    Character: {
      jungModel: "",
      oceanModel: "",
      Ego: "",
      Complexes: "",
      Persona: "",
      Anima: "",
      Shadow: "",
      Self: "",
      psychicQuirks: "",
      physicQuirks: "",
    },
    Location: {},
    Object: {},
    Metaphysic: {},
  },
  reducers: {
    switchType(state, action) {
      state.Type = action.payload.Type;
    },
    openDefault(state, action) {
      state.Type = action.payload.Type;
      state.Id = action.payload.Id;
      state.Concept = action.payload.Concept;
      state.reasonOfConcept = action.payload.reasonOfConcept;
      state.Title = action.payload.Title;
      state.Summary = action.payload.Summary;
      state.Description = action.payload.Description;
      state.Cause = action.payload.Cause;
      state.Purpose = action.payload.Purpose;
      state.Myth = action.payload.Myth;
      state.Character = {};
      state.Location = {};
      state.Object = {};
      state.Metaphysic = {};
    },
    updateDefault(state, action) {
      state.Concept = action.payload.concept;
      state.reasonOfConcept = action.payload.reasonofconcept;
      state.Title = action.payload.wbname;
      state.Summary = action.payload.summary;
      state.Description = action.payload.description;
      state.Cause = action.payload.cause;
      state.Purpose = action.payload.purpose;
      state.Myth = action.payload.myth;
      state.Character = {};
      state.Location = {};
      state.Object = {};
      state.Metaphysic = {};
    },
    openCharacter(state, action) {
      state.Type = action.payload.Type;
      state.Id = action.payload.Id;
      state.Concept = action.payload.Concept;
      state.reasonOfConcept = action.payload.reasonOfConcept;
      state.Title = action.payload.Title;
      state.Summary = action.payload.Summary;
      state.Description = action.payload.Description;
      state.Cause = action.payload.Cause;
      state.Purpose = action.payload.Purpose;
      state.Myth = action.payload.Myth;
      state.Character = {};
      state.Character.jungModel = action.payload.Character.jungModel;
      state.Character.oceanModel = action.payload.Character.oceanModel;
      state.Character.Ego = action.payload.Character.Ego;
      state.Character.Complexes = action.payload.Character.Complexes;
      state.Character.Persona = action.payload.Character.Persona;
      state.Character.Anima = action.payload.Character.Anima;
      state.Character.Shadow = action.payload.Character.Shadow;
      state.Character.Self = action.payload.Character.Self;
      state.Character.psychicQuirks = action.payload.Character.psychicQuirks;
      state.Character.physicQuirks = action.payload.Character.physicQuirks;
      state.Location = {};
      state.Object = {};
      state.Metaphysic = {};
    },
    updateCharacter(state, action) {
      state.Concept = action.payload.concept;
      state.reasonOfConcept = action.payload.reasonofconcept;
      state.Title = action.payload.wbname;
      state.Summary = action.payload.summary;
      state.Description = action.payload.description;
      state.Cause = action.payload.cause;
      state.Purpose = action.payload.purpose;
      state.Myth = action.payload.myth;
      state.Character = {};
      state.Character.jungModel = action.payload.jungmodel;
      state.Character.oceanModel = action.payload.oceanmodel;
      state.Character.Ego = action.payload.ego;
      state.Character.Complexes = action.payload.complexes;
      state.Character.Persona = action.payload.persona;
      state.Character.Anima = action.payload.anima;
      state.Character.Shadow = action.payload.shadow;
      state.Character.Self = action.payload.self;
      state.Character.psychicQuirks = action.payload.psychicquirks;
      state.Character.physicQuirks = action.payload.physicquirks;
      state.Location = {};
      state.Object = {};
      state.Metaphysic = {};
    },
    close(state) {
      state.Type = "";
      state.Id = 0;
      state.Concept = "";
      state.reasonOfConcept = "";
      state.Title = "";
      state.Summary = "";
      state.Description = "";
      state.Cause = "";
      state.Purpose = "";
      state.Myth = "";
      state.Character = {};
      state.Character.jungModel = "";
      state.Character.oceanModel = "";
      state.Character.Ego = "";
      state.Character.Complexes = "";
      state.Character.Persona = "";
      state.Character.Anima = "";
      state.Character.Shadow = "";
      state.Character.Self = "";
      state.Character.psychicQuirks = "";
      state.Character.physicQuirks = "";
      state.Location = {};
      state.Object = {};
      state.Metaphysic = {};
    },
  },
});

export default worldBuildingSlice;

export const worldBuildingActions = worldBuildingSlice.actions;
