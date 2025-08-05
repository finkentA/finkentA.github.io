---
title: "Localized Evaluation for Constructing Discrete Vector Fields"
collection: publications
category: conferences
permalink: /publication/2024-10-18-outward-star-1
excerpt: 'This paper is about forming the idea of an outward star and applying an algorithm for scalar fields.'
date: 2024-10-18
venue: 'IEEE Vis 2024'
slidesurl: 'http://academicpages.github.io/files/osa_slides.pdf'
paperurl: 'http://academicpages.github.io/files/OSA_paper.pdf'
bibtexurl: 'http://academicpages.github.io/files/osa_bibtex.bib'
citation: 'Finken, Tanner. (2024). &quot;Localized Evaluation for Constructing Discrete Vector Fields.&quot; <i>IEEE Vis 2024</i>.'
---

Abstract: Topological abstractions offer a method to summarize the behavior of vector fields, but computing them robustly can
be challenging due to numerical precision issues. One alternative is to represent the vector field using a discrete approach, which
constructs a collection of pairs of simplices in the input mesh that satisfies criteria introduced by Forman’s discrete Morse theory. While
numerous approaches exist to compute pairs in the restricted case of the gradient of a scalar field, state-of-the-art algorithms for
the general case of vector fields require expensive optimization procedures. This paper introduces a fast, novel approach for pairing
simplices of two-dimensional, triangulated vector fields that do not vary in time. The key insight of our approach is that we can employ a
local evaluation, inspired by the approach used to construct a discrete gradient field, where every simplex in a mesh is considered by no
more than one of its vertices. Specifically, we observe that for any edge in the input mesh, we can uniquely assign an outward direction
of flow. We can further expand this consistent notion of outward flow at each vertex, which corresponds to the concept of a downhill
flow in the case of scalar fields. Working with outward flow enables a linear-time algorithm that processes the (outward) neighborhoods
of each vertex one-by-one, similar to the approach used for scalar fields. We couple our approach to constructing discrete vector fields
with a method to extract, simplify, and visualize topological features. Empirical results on analytic and simulation data demonstrate
drastic improvements in running time, produce features similar to the current state-of-the-art, and show the application of simplification
to large, complex flows.
