const categories = [
  "Remote", "MNC", "Internship", "Fresher", "Sales",
  "Banking & Finance", "Engineering", "HR", "Fortune 500",
  "Data Science", "Marketing"
];

const CategoryList = () => (
  <section className="flex flex-wrap justify-center gap-4 p-8">
    {categories.map((cat, index) => (
      <div
        key={index}
        className="py-2 px-6 rounded-full border border-gray-300 bg-white cursor-pointer font-semibold text-[0.9rem] transition hover:bg-[#e1eaff] hover:border-[#2056e1] hover:text-[#2056e1]"
      >
        {cat}
      </div>
    ))}
    <div className="py-2 px-6 rounded-full bg-[#2056e1] text-white font-semibold border-transparent cursor-pointer ml-2 transition hover:bg-[#0b40bb]">
      View More
    </div>
  </section>
);

export default CategoryList;
