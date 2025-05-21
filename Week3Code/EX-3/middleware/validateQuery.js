export const validateQuery = (req,res,next) => {
    const {minCredits, maxCredits} = req.query;
    if(minCredits && isNaN(minCredits) || maxCredits && isNaN(maxCredits)){
        return res.status(400).json({error: "minCredits and maxCredits should be numbers"});
    }
    if(parseInt(minCredits) > parseInt(maxCredits)){
        return res.status(400).json({error: "minCredits cannot be greater than maxCredits"});
    }
    next();
}