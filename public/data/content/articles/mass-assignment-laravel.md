---
title: "Mass Assignment no Laravel: entendendo o $fillable"
slug: "mass-assignment-laravel"
---

# Mass Assignment no Laravel:  entendendo o $fillable e o $guarded

![Mass Assignment no Laravel](/data/images/mass-assignment-laravel.png)

Ao trabalhar com Eloquent no Laravel, é comum criarmos um model e, em seguida, tentarmos salvar vários atributos de uma vez.

Por exemplo:

```php
$product = Product::create([
    'name' => 'Notebook',
    'sku' => 'NOTE-001',
    'price' => 3500.00,
]);
