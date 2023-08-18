const validateCreateBody = (request, response, next) => {
    const {body} = request;
    if(body.description === undefined || body.description === '' || body.description === null){return response.status(400).json({message: 'description is required'})}
    if(body.description === '' || body.description === null){return response.status(400).json({message: 'description not accept empty data'})}

    if(body.value === undefined){return response.status(400).json({message: 'value is required'})}
    if(body.value === '' || body.value === null){return response.status(400).json({message: 'value not accept empty data'})}
    if(typeof body.value != 'number'){return response.status(400).json({message: 'value must be numeric instead of string'})}

    if(body.status === undefined || body.status === '' || body.status === null){return response.status(400).json({message: 'status is required: {pending, paid, cancelled}'})}

    if(body.installments === undefined || body.installments === '' || body.installments === null){return response.status(400).json({message: 'installments is required'})}
    if(body.installments === '' || body.installments === null){return response.status(400).json({message: 'installments not accept empty data'})}
    if(typeof body.installments != 'number'){return response.status(400).json({message: 'installments must be numeric instead of string'})}
    
    if(body.recipe_or_expense === undefined){return response.status(400).json({message: 'recipe_or_expense is required'})}
    if(body.recipe_or_expense === '' || body.recipe_or_expense === null){return response.status(400).json({message: 'recipe_or_expense not accept empty data'})}
    if(body.recipe_or_expense != "recipe" && body.recipe_or_expense != "expense"){return response.status(400).json({message: "recipe_or_expense only accept: 'recipe' or 'expense' data"})}

    next();
}

module.exports = {
    validateCreateBody
};


