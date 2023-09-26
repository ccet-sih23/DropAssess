import { API } from "sveltekit-api";

export default new API(import.meta.glob("./**/*.ts"), {
    openapi: "3.0.0",
    info: {
        title: "Drop Assess API",
        version: "0.0.1",
        description: "Drop Assess API MVP Scope",
    },
});