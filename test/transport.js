const Transport = artifacts.require("Transport");

/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */
contract("Transport", function (accounts) {
  it("should return the list of accounts", async ()=> {
    console.log(accounts);
  });

  it("Deploy contract should assert true", async function () {
    await Transport.deployed();
    return assert.isTrue(true);
  });

  const[contractOwner, driverId] = accounts;

  // beforeEach (async function() {
  //   instance = await Transport.new();
  // });

  it("is owned by owner", async () => {
    const instance = await Transport.deployed();
    assert.equal(
      // Hint:
      //   the error `TypeError: Cannot read property 'call' of undefined`
      //   will be fixed by setting the correct visibility specifier. See
      //   the following two links
      //   1: https://docs.soliditylang.org/en/v0.8.5/cheatsheet.html?highlight=visibility#function-visibility-specifiers
      //   2: https://docs.soliditylang.org/en/v0.8.5/contracts.html#getter-functions
      await instance.owner.call(),
      contractOwner,
      "owner is not correct",
    );
  });

  it("should register and return name", async () =>{
    const transport = await Transport.deployed();
    await transport.setDriver("Thuy", {from: driverId});
    const getName = await transport.getDriver({from: driverId});
    console.log(getName);
    assert.equal(getName, "Thuy", "Wrong name registered");
  });

  describe("Set Driver", () => {
    it("Should register Driver", () => {
      return Transport.deployed().then((instance) => {
        return instance.setDriver("Tom", { from: driverId }); 
    });


    it("should register and return name", async () =>{
      const transport = await Transport.deployed();
      const driver = await transport.setDriver("Thuy", {from: driverId});
      const getName = drivers[driverId].name;
      assert.equal(getName, "Thuy", "Wrong name registered");
    });


    // it("Should return name", async () => {
    //   const instance = Transport.deployed();
    //   await instance.setDriver("Tomo", {from: driver});
    //   assert.equal(registerDriver, "Terletubby", "Name should be same");
    // });


    //emit event log
  });
});
});
