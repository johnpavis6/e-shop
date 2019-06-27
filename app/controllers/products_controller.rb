class ProductsController < ApplicationController
  def create
    @product = Product.new(params.require(:product).permit(:name, :price))
    if @product.save
      render :json => { "insertId" => @product.id }
    else
      render :status => 500
    end
  end

  def read
    @products = Product.all
    render :json => { "products" => @products }
  end

  def update
    @product = Product.find(params.require(:product)[:id]) rescue nil
    if @product && @product.update(params.require(:product).permit(:name, :price))
      render :status => 200,:json => { 'message' => 'success' } 
    else
      render :status => 404,:json => { 'message' => 'not found' }
    end
  end

  def delete
    @product = Product.find(params[:id]) rescue nil
    if @product && @product.destroy
      render :status => 200,:json => { 'message' => 'success' } 
    else
      render :status => 404,:json => { 'message' => 'not found' }
    end
  end
end
