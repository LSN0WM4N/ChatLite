import { describe, it, expect } from "vitest";
import reducer, {
    setLoading,
    removeLoading,
    setError,
    removeError,
    setShowChannels,
    hideChannels,
} from "./uiSlice";

describe("uiSlice", () => {
    const initialState = {
        theme: "light",
        loading: false,
        error: null,
        showChannels: true,
    };

    it("should return the initial state when passed an empty action", () => {
        expect(reducer(undefined, { type: "" })).toEqual(initialState);
    });

    it("should set loading to true", () => {
        const state = reducer(initialState, setLoading());
        expect(state.loading).toBe(true);
    });

    it("should remove loading (set to false)", () => {
        const state = reducer({ ...initialState, loading: true }, removeLoading());
        expect(state.loading).toBe(false);
    });

    it("should set an error message", () => {
        const state = reducer(initialState, setError("Something went wrong"));
        expect(state.error).toBe("Something went wrong");
    });

    it("should remove the error (set to null)", () => {
        const state = reducer({ ...initialState, error: "error!" }, removeError());
        expect(state.error).toBeNull();
    });

    it("should set showChannels to true", () => {
        const state = reducer({ ...initialState, showChannels: false }, setShowChannels());
        expect(state.showChannels).toBe(true);
    });

    it("should hide channels (set showChannels to false)", () => {
        const state = reducer(initialState, hideChannels());
        expect(state.showChannels).toBe(false);
    });
});
