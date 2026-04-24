const validTransitions = {
    PLACED: ['CONFIRMED', 'CANCELLED'],
    CONFIRMED: ['PREPARING'],
    PREPARING: ['READY'],
    READY: ['OUT_FOR_DELIVERY'],
    OUT_FOR_DELIVERY: ['DELIVERED']
};

const isValidTransition = (currentStatus, newStatus) => {
    return validTransitions[currentStatus]?.includes(newStatus);
};

module.exports = { isValidTransition };