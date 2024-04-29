//* just one possibility

const categorySchema = new Schema({
  name: { type: String, required: true },
});

// Define a virtual property to calculate the total value for each category
categorySchema.virtual('total').get(function () {
  // Use a regular function here to access 'this' properly
  // Calculate the total value by summing up the expenses associated with this category
  return this.expenses.reduce((total, expense) => total + expense.value, 0);
});

// Ensure virtual properties are included in JSON output
categorySchema.set('toJSON', { getters: true });

// Assuming the expenses are referenced within the category schema
// This assumes that the 'expenses' field in the category document is an array of expense documents
// The 'ref' option specifies the model to which the expenses reference
categorySchema.virtual('expenses', {
  ref: 'Expense', // The model to use for referencing
  localField: '_id', // The field in the current document
  foreignField: 'categoryName', // The field in the referenced document
});

// Then, in your tripSchema, you reference categorySchema and expenseSchema correctly
