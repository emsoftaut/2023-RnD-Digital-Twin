import { useMachineData, createUser, getSingleUser, getUsers, toggleMachine } from '../data/FireBaseData'; //Replace 'yourFile' with the correct filename
import { ref, onValue, off, get, set } from "firebase/database";

jest.mock("firebase/database");

const databaseRef = undefined;
ref.mockReturnValue(databaseRef);



describe("useMachineData", () => {
  // Test logic for useMachineData can be complex due to useEffect. 
  // This can be tested more effectively with react testing libraries 
  // like @testing-library/react-hooks or similar.
});

describe("createUser", () => {
    it("successfully creates a user", async () => {
      set.mockResolvedValueOnce();
  
      await createUser("test.email@example.com", "John Doe");
  
      expect(set).toHaveBeenCalledWith(databaseRef, { name: "John Doe" });
    });
  });

describe("getSingleUser", () => {
  it("returns a user's name if user exists", async () => {
    get.mockResolvedValueOnce({
      exists: jest.fn(() => true),
      val: jest.fn(() => ({ name: "John Doe" }))
    });

    const result = await getSingleUser("test.email@example.com");

    expect(result).toBe("John Doe");
  });

  it("returns null if user does not exist", async () => {
    get.mockResolvedValueOnce({
      exists: jest.fn(() => false),
    });

    const result = await getSingleUser("test.email@example.com");

    expect(result).toBeNull();
  });
});

describe("getUsers", () => {
    it("calls the callback with users array", () => {
      const mockData = {
        "test.email@example.com": { email: "test.email@example.com", name: "John Doe" },
        "another.email@example.com": { email: "another.email@example.com", name: "Jane Doe" }
      };
  
      const mockCallback = jest.fn();
  
      onValue.mockImplementationOnce((_, callback) => {
        callback({
          val: jest.fn(() => mockData)
        });
      });
  
      getUsers(mockCallback);
  
      expect(mockCallback).toHaveBeenCalledWith([
        { email: "test.email@example.com", name: "John Doe" },
        { email: "another.email@example.com", name: "Jane Doe" }
      ]);
    });
  });

  describe("toggleMachine", () => {
    it("sets machine status to the provided value", async () => {
      set.mockResolvedValueOnce();
  
      await toggleMachine("machine123", true); // setting the machine status to true
  
      expect(set).toHaveBeenCalledWith(databaseRef, true);
    });
});

