"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getCurrent = async (req, res) => {
    const { email, subscription } = req.user;
    res.status(200).json({
        code: 200,
        data: { email, subscription },
    });
};
exports.default = getCurrent;
//# sourceMappingURL=getCurrent.js.map