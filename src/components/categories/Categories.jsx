import {Link, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import * as categoriesService from "../../services/Category"


const Categories = () => {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);

    const imagUrl= "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLaQSNoj0FQyBprWy1nVktEw7j0Aq54OR47BABKOAW1Q&s";

    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const categories = await categoriesService.getCategories();
                if (categories.status === 200) {
                    setCategories(categories?.data?.listCategories);
                } else {
                    console.log(categories);
                }
            } catch (error) {
                console.log("Error fetching categories:", error);
            }
        }
        fetchCategory();
    }, [])

    const handleNavigate = (categoryId) => {
        navigate('/spaces', {state: {categoryId}})
    }



    return (
        <>
            <div
                className=" max-w-[1200px] mx-auto px-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-3 lg:gap-5 my-12">

                {
                    categories.length > 0 && categories.map(category => {
                        return (
                                <div className="h-[250px] relative group rounded-xl hover:shadow-lg overflow-hidden"  key={category?.id} onClick={ () => handleNavigate(category?.categorySpace?.id)}>
                                    <img
                                        className="h-full w-full object-cover rounded-xl transition-all group-hover:scale-110 group-hover:transform group-hover:origin-center "
                                        src={category?.img||imagUrl}
                                        alt={category?.categoryName}/>
                                    {/* <div
                                        className="absolute bg-black opacity-60 top-0 left-0 right-0 bottom-0 rounded-xl transition-all group-hover:top-3 group-hover:left-3 group-hover:bottom-3 group-hover:right-3"></div> */}
                                    <div
                                        className="absolute bottom-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 text-white text-center">
                                        <p className="block font-bold text-xl">{category?.categoryName}</p>
                                    </div>
                                </div>
                        )
                    })
                }

            </div>
            <div className="container mx-auto my-2 text-center">
                <Link to="/spaces"
                      className="inline-block px-8 py-2 rounded-xl border-2 border-primaryColor font-semibold transition-all hover:bg-primaryColor hover:text-white hover:shadow-primaryColor hover:shadow ">View
                    All</Link>
            </div>
        </>
    )


}

export default Categories