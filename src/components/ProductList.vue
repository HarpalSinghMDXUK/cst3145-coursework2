<template>
    <div>
        <h1>Welcome to the Lessons List</h1>


        <div class="row">
            <!-- <div class="col-md-3 col-sm-12">
            
            <h4>Sorting:</h4>
            <input type="radio" id="b" value="b" v-on:click="sortedProducts(sorted)" v-model="sorted" />
            <label for="b">By Price</label><br>

            <input type="radio" id="a" value="a" v-on:click="sortedProducts(sorted)" v-model="sorted" />
            <label for="a">By Availability</label><br>
        </div> -->

            <div class="col-md-9 col-sm-12">
                <div class="row">
                    <div v-for="(lesson, i) in lessons" class="col-md-6 col-sm-6 mt-2 box-prod">
                        <div class="card">
                            <img v-bind:src="imagesBaseURL + lesson.subjectImg" class="card-img-top" width="200">
                            <h3 v-text="lesson.subjectName" class="item-heading ml-3"></h3>

                            <div class="card-body">
                                <p class="card-text">
                                <p style="margin:0;">Price:{{ lesson.currency }}{{ lesson.price }}</span></p>
                                <p style="margin:0;">Spaces: <span>{{ itemsLeft(lesson) }}</span></p>
                                <p style="margin:0;">Location: <span v-text="lesson.location"></span></p>
                                </p>
                                <font-awesome-icon icon="fa-solid fa-cart-shopping" class="float-left mr-2"
                                    style="margin-top:11px;"></font-awesome-icon>
                                <input type="button" class="btn btn-default float-left" value="Add to Cart"
                                    v-on:click="AddToCart(lesson)" v-if="canAddToCart(lesson)">
                                <button disabled class="btn btn-danger disabled float-left" v-else>Add to Cart</button>

                                <span v-if="itemsLeft(lesson) === 0" class="float-left  ml-2 mt-1">All Out!</span>
                                <span class="float-left ml-2 mt-1" v-else-if="itemsLeft(lesson) < 5">Only {{
                                    itemsLeft(lesson)
                                }} left!</span>
                                <span v-else class="float-left  ml-2 mt-1">Buy Now!</span>
                                <!--
        
                            <span v-if="itemsLeft(lesson) === 0" class="float-left  ml-2 mt-1">All Out!</span>
                            <span class="float-left ml-2 mt-1" v-else-if="itemsLeft(lesson) < 5">Only {{ itemsLeft(lesson)
                            }} left!</span>
                            <span v-else class="float-left  ml-2 mt-1">Buy Now!</span> -->
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>


<script>
export default {
    name: 'ProductList',
    props: ["lessons", "searchResults", "imagesBaseURL", "MyCart",],
    data() {
        return {}
    },
    methods: {
        AddToCart: function (lesson) {
            // this.MyCart.lessons.push(lesson.id);   
            this.$emit("add-to-cart", lesson);
        },
        CartedItemSpacesCount(id) {
            let count = 0;
            for (let i = 0; i < this.MyCart.lessons.length; i++) {
                if (this.MyCart.lessons[i] === id) {
                    count++;
                }
            }
            return count;
        },
        // Check if Lesson Spaces Available
        canAddToCart(lesson) {
            return lesson.spaces > this.cartCount({ id: lesson.id });
        },
        // How many spaces left of lesson count
        itemsLeft(lesson) {
            return lesson.spaces - this.cartCount(lesson.id);
        },
        // Cart Items Counting and increment into count
        cartCount(id) {
            let count = 0;
            for (let i = 0; i < this.MyCart.lessons.length; i++) {
                if (this.MyCart[i] === id) {
                    count++;
                }
            }
            return count;
        },
    }
}
</script>