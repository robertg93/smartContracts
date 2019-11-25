pragma solidity >=0.4.0 <0.6.0;

contract CrowdfoundFactory {
    address[] public deployedCrowdfound;
    function createCrowdfound(uint minimum) public {
        address newCrowdfound = address(new Crowdfound(minimum, msg.sender));
        deployedCrowdfound.push(newCrowdfound);

    }

    function getDeployedCrowdfound() public view returns ( address[] memory) {
        return deployedCrowdfound;
    }
}

contract Crowdfound{
    struct Request{
        string description;
        uint value;
        address payable recipient;
        bool complete;
        uint approvalCount;
        mapping(address => bool) approvals;
    }
    Request[] public requests;
    address public manager;
    uint public minimumContribution;
    mapping(address => bool) public approvers;
    uint public approversCount;
    modifier restricted() {
        require(msg.sender == manager);
        _;
    }

    constructor(uint minimum, address creator) public {
        manager = creator;
        minimumContribution = minimum;
    }

    function contribiute() public payable{
        require(msg.value > minimumContribution);
        approvers[msg.sender] = true;
        approversCount++;
    }

    function createRequest(string memory description, uint value, address payable recipient) public restricted {
        require(approvers[msg.sender]);
        Request memory newRequest = Request({
            description: description,
            value: value,
            recipient: recipient,
            complete: false,
            approvalCount: 0
        });

        requests.push(newRequest);
    }

    function approveRequest(uint index) public {
        Request storage request = requests[index];

        require(approvers[msg.sender]);
        require(!request.approvals[msg.sender]);

        request.approvals[msg.sender] = true;
        request.approvalCount++;
    }

    function finalizeRequest(uint index) public restricted {
        Request storage request = requests[index];

        require(request.approvalCount > (approversCount / 2 ));
        require(!request.complete);

        request.recipient.transfer(request.value);
        request.complete = true;
    }

}