const Transport = artifacts.require("Transport");

/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */
contract("Transport", function (accounts) {
  let contract;

  before(async () => {
    contract = await Transport.deployed();
  });

  describe("deployment", async () => {
    it("deploys successfully", async () => {
      const address = contract.address;
      assert.notEqual(address, 0x0);
      assert.notEqual(address, "");
      assert.notEqual(address, null);
      assert.notEqual(address, undefined);
    });

    const [contractOwner, driverId] = accounts;

    it("is owned by owner", async () => {
      const owner = await contract.owner.call();
      assert.equal(
        // Hint:
        //   the error `TypeError: Cannot read property 'call' of undefined`
        //   will be fixed by setting the correct visibility specifier. See
        //   the following two links
        //   1: https://docs.soliditylang.org/en/v0.8.5/cheatsheet.html?highlight=visibility#function-visibility-specifiers
        //   2: https://docs.soliditylang.org/en/v0.8.5/contracts.html#getter-functions
        owner,
        contractOwner,
        "owner is correct"
      );
    });

    describe("Set Driver", () => {
      it("should register and return name", async () => {
        await contract.setDriver("L", { from: driverId });
        const driver = await contract.getDriver({ from: driverId });
        assert.equal(driver.name, "L", "Wrong name registered");
      });
    });

    describe("Change state to departed", () => {
      it("should change state to departed", async () => {
        const result = await contract.changeStateDeparted();
        const event = result.logs[0].args;
        assert.equal(event.state, "Departed");
        const driver = await contract.getDriver();
        assert.equal(driver.state, 1);
      });

      it("cannot be called by other then owner", async () => {
        await contract
          .changeStateDeparted({ from: accounts[3] })
          .catch((error) => {
            assert.equal(
              error.message,
              "Returned error: VM Exception while processing transaction: revert Ownable: caller is not the owner -- Reason given: Ownable: caller is not the owner."
            );
          });
      });
    });

    describe("Change state to arrived", () => {
      it("should change state to arrived", async () => {
        const result = await contract.changeStateArrived();
        const event = result.logs[0].args;
        assert.equal(event.state, "Arrived");
        const driver = await contract.getDriver();
        assert.equal(driver.state, 2);
      });

      it("cannot be called by other then owner", async () => {
        await contract
          .changeStateArrived({ from: accounts[3] })
          .catch((error) => {
            assert.equal(
              error.message,
              "Returned error: VM Exception while processing transaction: revert Ownable: caller is not the owner -- Reason given: Ownable: caller is not the owner."
            );
          });
      });
    });
  });
});
