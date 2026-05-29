import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AddDutyDialog from "../components/AddDutyDialog";
import * as hubApi from "../apis/hub";
import { message } from "antd";

jest.mock("../apis/hub", () => ({
  createDuty: jest.fn(),
  editDuty: jest.fn(),
}));

jest.mock("antd", () => {
  const actual = jest.requireActual("antd");
  return {
    ...actual,
    message: {
      success: jest.fn(),
      error: jest.fn(),
    },
  };
});

describe("AddDutyDialog", () => {
  const onClose = jest.fn();
  const onCreated = jest.fn(async () => undefined);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders add mode", () => {
    render(
      <AddDutyDialog open={true} onClose={onClose} onCreated={onCreated} />,
    );

    expect(screen.getByText("Add Duty")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Add" })).toBeInTheDocument();
  });

  it("creates duty on submit", async () => {
    const user = userEvent.setup();
    (hubApi.createDuty as jest.Mock).mockResolvedValue(undefined);

    render(
      <AddDutyDialog open={true} onClose={onClose} onCreated={onCreated} />,
    );

    await user.type(screen.getByRole("textbox"), "New Duty");
    await user.click(screen.getByRole("button", { name: "Add" }));

    await waitFor(() => {
      expect(hubApi.createDuty).toHaveBeenCalledWith("New Duty");
    });

    expect(message.success).toHaveBeenCalledWith("Duty added");
    expect(onClose).toHaveBeenCalled();
    expect(onCreated).toHaveBeenCalled();
  });

  it("renders edit mode and updates duty", async () => {
    const user = userEvent.setup();
    (hubApi.editDuty as jest.Mock).mockResolvedValue(undefined);

    render(
      <AddDutyDialog
        id="d1"
        title="Old"
        open={true}
        onClose={onClose}
        onCreated={onCreated}
      />,
    );

    expect(screen.getByText("Edit Duty")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Save" })).toBeInTheDocument();

    const input = screen.getByRole("textbox");
    await user.clear(input);
    await user.type(input, "Updated");
    await user.click(screen.getByRole("button", { name: "Save" }));

    await waitFor(() => {
      expect(hubApi.editDuty).toHaveBeenCalledWith("d1", "Updated");
    });

    expect(message.success).toHaveBeenCalledWith("Duty updated");
    expect(onClose).toHaveBeenCalled();
    expect(onCreated).toHaveBeenCalled();
  });
});
