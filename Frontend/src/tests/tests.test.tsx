import { screen, render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";
import { singleUserMock, usersMock } from "./Mocks/userMocks";

describe("Testing frontend application", () => {
  it("Checks whether components are rendered on the page when starting it", () => {
    render(<App />);
    const buttonFind = screen.getByText("FIND");
    const inputFind = screen.getByRole("textbox", { name: "" });
    const buttonSend = screen.getByText("SEND");
    const inputRegister = screen.getByTestId("my-file");

    expect(buttonFind).toBeInTheDocument();
    expect(buttonSend).toBeInTheDocument();
    expect(inputFind).toBeInTheDocument();
    expect(inputRegister).toBeInTheDocument();
  });

  it("Checks if clicking the find button renders all records and checks if clicking the delete button deletes a record", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: async () => usersMock,
    });

    render(<App />);

    const buttonFind = screen.getByText("FIND");
    userEvent.click(buttonFind);

    const buttonsDelete = await screen.findAllByTestId("delete-button");
    expect(buttonsDelete.length).toBe(4);
    await userEvent.click(buttonsDelete[0]);
    const buttonsDeleteAfterClick = await screen.findAllByTestId(
      "delete-button"
    );
    expect(buttonsDeleteAfterClick.length).toBe(3);
  });

  it("Checks whether when clicking the find button the search for records matches what was typed", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: async () => singleUserMock,
    });

    render(<App />);
    const inputFind = screen.getByRole("textbox", { name: "" });
    userEvent.type(inputFind, "Jhon");
    const buttonFind = screen.getByText("FIND");
    userEvent.click(buttonFind);

    await waitFor(() => {
      const buttonsDelete = screen.getAllByTestId("delete-button");
      expect(buttonsDelete.length).toBe(1);
    });
  });

  // it('Checks whether when sending a file it is rendered on the screen', async () => {
  //   const csvContent = 'name,city,country,favoriteSport\nLucas Rosa,Pelotas,Brazil,Football';
  //   const file = new File([csvContent], 'test.csv', { type: 'text/csv' });

  //   global.fetch = jest.fn().mockResolvedValue({
  //     json: async () => (sendUser),
  //   });

  //   global.fetch = jest.fn().mockResolvedValue({
  //     json: async () => ([...usersMock, sendUser]),
  //   });

  //   render(<App />);

  //   const buttonFind = screen.getByText('FIND');
  //   const buttonSend = screen.getByText('SEND');
  //   const inputRegister = screen.getByTestId('my-file');

  //   userEvent.upload(inputRegister, file)
  //   userEvent.click(buttonSend);

  //   await userEvent.click(buttonFind)

  //   await waitFor(() => {
  //     const buttonsDelete = screen.getAllByTestId('delete-button')
  //     expect(buttonsDelete.length).toBe(5)
  //   })
  // })
});
