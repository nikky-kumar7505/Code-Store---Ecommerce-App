import React from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Edit, Search, Trash2 } from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { Card, CardContent, CardFooter } from '../ui/card'
import { Button } from '../ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import { Textarea } from '../ui/textarea'
import { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setProducts } from '@/redux/slices/productSlice'
import axios from 'axios'
import { toast } from 'sonner'
import useErrorLogout from '@/hooks/use-error-logout'


const AllProducts = () => {

  const {products} = useSelector((state) => state.product )  

  const [category,setCategory] = useState("all")
  const [searchTerm, setSearchTerm] = useState("") //searchTerm = search
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const [productToDelete, setProductToDelete] = useState(null)

  const dispatch = useDispatch()
  const {handleErrorLogout} = useErrorLogout()

  useEffect(()=>{
    const getFilterproducts = async () =>{
      const res = await axios.get(import.meta.env.VITE_API_URL + `/get-products?category=${category}&search=${searchTerm}`);
      const data = res.data;
      dispatch(setProducts(data.data));
    };

    getFilterproducts();
  },[category, searchTerm])  //searchTerm = search

  const removeFromBlacklist = async (id)=>{
    try {
      const res = await axios.put(import.meta.env.VITE_API_URL + `/remove-from-blacklist/${id}`,
        null,
        {
          headers : {
            Authorization : `Bearer ${localStorage.getItem("token")}`
          }
        }
      ); 
      const {message} = res.data;
      toast.success(`Success: ${message}`);

    } catch (error) {
      handleErrorLogout(error,"Error occured while reverting changes")
    }
  }


  const blacklistProduct = async (id) =>{
    try {
      const res = await axios.put(import.meta.env.VITE_API_URL + `/blacklist-product/${id}`,
        null,
        {
          headers : {
            Authorization : `Bearer ${localStorage.getItem("token")}`
          }
        }
      );

      const {message, data} = res.data; 

      toast.success(`Success: ${message}`, {
        action: <button className='border rounded-md w-full sm:w-auto px-4 py-2 text-sm' onClick={()=>{
          removeFromBlacklist(data._id)
        }}>Undo Changes</button>
      });



    } catch (error) {
      handleErrorLogout(error, "Error occured while blacklisting product")
    }
  };

  const handleEdit = (product) =>{
    setEditingProduct(product)
    setIsEditModalOpen(true)
  };

  const confirmDeleteProduct = async () => {
    if (!productToDelete?._id) return
    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_API_URL}/delete-product/${productToDelete._id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      const { message } = res.data
      toast.success(message || "Product deleted")
      dispatch(setProducts(products.filter((p) => p._id !== productToDelete._id)))
      setProductToDelete(null)
    } catch (error) {
      handleErrorLogout(error, "Error while deleting product")
    }
  }

  const handleEditSubmit = async(e)=>{
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const updateProduct = {
      ...editingProduct,
      name : formData.get("name"),
      description : formData.get("description"),
      price : formData.get("price"),
      category : formData.get("category")
    };

    dispatch(
      setProducts(
        products.map( (p)=> (p._id === updateProduct._id ? updateProduct : p ) )
      )
    )

    try {

      const res = await axios.put(import.meta.env.VITE_API_URL + `/update-product/${editingProduct._id}`,{
        name : updateProduct.name,
        description : updateProduct.description,
        price : updateProduct.price,
        category : updateProduct.category
      },
      {
        headers : {
          Authorization : `Bearer ${localStorage.getItem("token")}`
        }
      }
     );

     const {message} = res.data;
     toast.success(`${message}`);
      
    } catch (error) {
      return handleErrorLogout(error, "Error occured while updating product")
    }
    setIsEditModalOpen(false);
    setEditingProduct(null)
  };


  return (
    <div className="mx-auto w-full min-w-0 max-w-full px-1 sm:px-0">
      <h1 className="mb-6 text-2xl font-bold tracking-tight sm:mb-8 sm:text-3xl">Our Products</h1>

      <div className="mb-8">
        <form className="flex w-full min-w-0 flex-col gap-4 sm:flex-row sm:items-end">
          <div className ="flex-1" >  
            <label className='block text-sm font-medium text-gray-700 mb-1' htmlFor="search">Search Product</label>
            <div className="relative">
              <Input type="text" id="search" placeholder="Search by name or Descripton" className="pl-10" value = {searchTerm}  onChange={(e) => setSearchTerm(e.target.value) } />
              <Search size={20} className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 ' />
            </div>
          </div>

          <div className="w-48">
            <label className='block text-sm font-medium text-gray-700 mb-1'  htmlFor="category" >Category </label>
            <Select value={category} onValueChange={setCategory} >
              <SelectTrigger id =" category" >
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all" > All Categories</SelectItem>
                <SelectItem value="headset" > headset</SelectItem>
                <SelectItem value="keyboard" > Keyboard</SelectItem>
                <SelectItem value="mouse" > Mouse</SelectItem>
              </SelectContent>
            </Select>
            
          </div>
        </form>
      </div>

      {
        products?.length === 0 ? (<p className='text-center text-gray-500 mt-8'>
          No products found, Try adjusting your search or category
        </p>) : (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

                {
                  products?.map((product)=>  (
                  <Card
                    key={product._id}
                    className="flex h-full min-h-0 min-w-0 flex-col overflow-hidden border-border/80 shadow-sm transition-shadow hover:shadow-md"
                  >
                    <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden bg-muted sm:aspect-square">
                      <img
                        src={product.image.url}
                        alt={product.name}
                        className="h-full w-full object-cover transition-transform duration-300 hover:scale-[1.02]"
                      />
                    </div>
                    <CardContent className="flex min-h-0 flex-1 flex-col gap-1 p-4 pb-3">
                        <h3 className="line-clamp-2 text-base font-semibold leading-snug">{product.name}</h3>
                        <p className="line-clamp-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                          {product.description}
                        </p>
                        <p className="pt-2 text-lg font-bold tabular-nums">₹{product.price}</p>
                    </CardContent>

                    <CardFooter className="mt-auto flex flex-col gap-2 border-t bg-muted/30 p-3 sm:p-4">
                      <div className="grid w-full grid-cols-2 gap-2">
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          className="h-9 w-full font-medium"
                          onClick={()=> handleEdit(product)}
                        >
                          <Edit className="mr-1.5 h-3.5 w-3.5" aria-hidden />
                          Edit
                        </Button>
                        <Button
                          type="button"
                          variant="secondary"
                          size="sm"
                          className="h-9 w-full px-1 text-xs font-medium sm:text-sm"
                          onClick={()=>{
                        !product.blacklisted
                          ? blacklistProduct(product._id)
                          : removeFromBlacklist(product._id)
                      }}
                        >
                          {!product.blacklisted ? "Blacklist" : "Unblock"}
                        </Button>
                      </div>
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        className="h-9 w-full font-medium"
                        onClick={() => setProductToDelete(product)}
                      >
                        <Trash2 className="mr-2 h-3.5 w-3.5" aria-hidden />
                        Delete product
                      </Button>
                    </CardFooter>
                  </Card> 
                  )
                )
               }
            </div>
        )
      }

    

 
    <Dialog open={!!productToDelete} onOpenChange={(open) => !open && setProductToDelete(null)}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete product?</DialogTitle>
          <DialogDescription>
            This will permanently remove “{productToDelete?.name}” from the catalog. This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-2 sm:gap-0">
          <Button type="button" variant="outline" onClick={() => setProductToDelete(null)}>
            Cancel
          </Button>
          <Button type="button" variant="destructive" onClick={confirmDeleteProduct}>
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>

    <Dialog  open={isEditModalOpen} onOpenChange={setIsEditModalOpen} >
       <DialogContent className="sm:max-[425px]">
        <DialogHeader>
          <DialogTrigger>Edit Product</DialogTrigger>
        </DialogHeader>

        <form onSubmit={handleEditSubmit} >
            <div className='grid gap-4 py-4' >
              <div className='grid gap-4 items-center ' >
                <Label htmlFor="name" >Name</Label>
                <Input id="name" name="name" defaultValue={editingProduct?.name } />
              </div>
              <div className='grid gap-4 items-center ' >
                <Label htmlFor="description" >Description</Label>
                <Textarea id="description"  defaultValue={editingProduct?.description } name="description" />
              </div>
              <div className='grid gap-4 items-center ' >
                <Label htmlFor="price" >Price</Label>
                <Input  type="number" id="price" name="price" defaultValue={editingProduct?.price } />
              </div>
              <div className='grid gap-4 items-center ' >
                <Label htmlFor="category" >Category</Label>
                <Select name='category' defaultValue={editingProduct?.category } >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="headset">Headset</SelectItem>
                    <SelectItem value="keyboard">Keyboard</SelectItem>
                    <SelectItem value="mouse">Mouse</SelectItem>
                  </SelectContent>
              </Select>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" >Save changes</Button>
            </DialogFooter>
        </form> 
       </DialogContent>
      </Dialog>

    </div>
  )
}

export default AllProducts