---
layout: post
title: The Date Problem
date: 2021-08-08 13:21
excerpt_separator: <!--more-->
categories: Ruby
---

Suppose we want to create an array of dates where a next date is a unit apart from the previous one.
A start date, a unit, and a number of dates are given.

Given following requirements:
* Start date - `Date.today`
* Unit - `1.month` (courtesy of `ActiveSupport`)
* Number - `3`

Let's see how we can approach this problem in Ruby. (Will use some bits of Rails)

<!--more-->

> Time is what we want most, but what we use worst.
>
> -- <cite>William Penn</cite>

## Date Range

Ruby gives us a `Range` object we can use that to try and solve our problem. Since we don't really care about the `end_date` we can make use of an endless range. 

Let's create a date range:

```ruby
start_date = Date.today
date_range = (start..)

=> Sun, 08 Aug 2021..
```

So what we achieved here is an endless range with a starting point of today which happens to be the 8th of August 2021.

Now we can use `Range#first` method to look at the elements:

```ruby
date_range.first(3)

=> [Sun, 08 Aug 2021, Mon, 09 Aug 2021, Tue, 10 Aug 2021]
```

As we can see, we get an array of dates where the next date is one day apart. But how do we change that to 1 month. To do that we can use `Range#step` method like this:

```ruby
date_range.step(1.month).take(3)

=> []
```

To our surprise, this returns an empty array. If we try to call `each`, we'll see what the problem is:

```ruby
date_range.step(1.month).each do |date|
  puts "Print date: #{date}"
end

=> Sun, 08 Aug 2021..
```
We don't see the text with the date and inspecting `size` tells us it's `nil`:

```ruby
date_range.step(1.month).size

=> nil
```

This means ruby doesn't really know how to iterate over this collection. What we could try next is to experiment with a different type of Date/Time object. I found `Time.current` to be perfect for our example. 

The only problem is we have to convert it into `Integer`, otherwise we get:
```ruby
(Time.current..).step(1.month).take(3)

Traceback (most recent call last):
        1: from (irb):51
TypeError (can't iterate from ActiveSupport::TimeWithZone)
```

To get the time object back from an `Integer` we can use `Time.at` method:

```ruby
(Time.current.to_i..).step(1.month).take(3).map do |seconds|
  Time.at(seconds).to_date
end

=> [Sun, 08 Aug 2021, Tue, 07 Sep 2021, Fri, 08 Oct 2021]
```

This gives us promising results, but the second date is not exactly correct... 

## Integer#times

As our requirements specify the exact number of dates we could use the `Integer#times` method to solve our problem:


```ruby
start_date = Date.today

3.times.map do |i|
 start_date + i.months
end

=> [Sun, 08 Aug 2021, Wed, 08 Sep 2021, Fri, 08 Oct 2021]
```

This is a very simple and straightforward solution.

## Enumerator::new

We ruby developers are used to `Enumerable` module but not so much to its cousin `Enumerator` class. 

The solution I really like is using `Enumerator::new` to generate a date enumerator.

Let's see how to implement that:

```ruby
date_enumerator = Enumerator.new do |yielder|
  date = Date.today
  loop do
   yielder << date
   date += 1.month
  end
end
 
date_enumerator.take(3)

=> [Sun, 08 Aug 2021, Wed, 08 Sep 2021, Fri, 08 Oct 2021]
```

## Conclusions

* We had a look at three different ways of solving our date problem. 
* We learned about `Range#step` method and its basic usage. We saw it doesn't provide accurate results with dates.
* We used `Integer#times` and `Enumerator::new` to solve our problem.