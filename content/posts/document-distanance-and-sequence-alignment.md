---
title: Applying Document Distance to Sequence Alignment
date: "2021-03-30T13:00:51Z"
template: "post"
draft: false
slug: "applying-document-distance-to-sequence-alignment"
category: "Bioinformatics"
tags:
  - "Bioinformatics"
  - "Dynamic Programming"
  - "Algorithms"
description: "Bioinformatics is currently one of the fastest growing fields. From advancements in protein folding with Alpha Fold to algorithmic discoveries which resulted like Bowtie 2, to even mechanical improvements like Next Generation Sequencing (NGS), significant progress has been made—and will continue."
socialImage: "/media/owen-oertell-github-logo.png"
---

  Bioinformatics is currently one of the fastest growing fields. From advancements in protein folding with [Alpha Fold](https://deepmind.com/blog/article/alphafold-a-solution-to-a-50-year-old-grand-challenge-in-biology) to algorithmic discoveries which resulted like [Bowtie 2](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3322381/), to even mechanical improvements like Next Generation Sequencing (NGS), significant progress has been made&mdash;and will continue.

  Yet, one particularly interesting part of such a fascinating field I would like to talk about today is document distance and its application for sequence alignment.

## What is the Sequence Alignment Problem?

The emergence of NGS means that the amount of genomic data available has skyrocketed. However, this data is in the form of small (~250 base pairs) sequences of DNA, called *reads*,  which needs to be assembled to a reference genome. This is called sequence alignment. It is particularly useful for [Copy Number Variation (CNV)](https://www.genome.gov/genetics-glossary/Copy-Number-Variation) detection, which happens to be the subject of the research I am assisting with in the Dickson Lab at Georgia Tech. However, one issue in sequence alignment is the speed of read mapping. There often is 30x to 50x coverage (meaning that every base in the 3.2 billion base pair long genome had been added to a read that many times). Therefore, one can imagine that mapping all of these reads to the genome requires tremendous time and thus can always be improved.

## So What is Document Distance?

  Although you probably don't realize it, you are a beneficiary of document distance every day. Document distance the key algorithm used in spellcheck (along with [BK-trees](https://en.wikipedia.org/wiki/BK-tree)) because of its ability to account for transpositions (i.e. changing `ab` to `ba`).  So what is document distance? Well, document distance is just a quantitative characterization of the number of edits required to make two strings (also known as documents or a set of characters) the same. For example, lets consider the two strings `programming` and `engaging`. Now although programming is indeed very engaging, these two strings (see [here](https://en.wikipedia.org/wiki/String_(computer_science)) for more information about strings) are not identical. Yet, often times it is important to know just how different those two strings are. To do so, there are main approaches for figuring out the quantitative difference between two strings.

### Dynamic Programming Approach

  Dynamic programming[^1] is the process of breaking a problem into much smaller, similar problems which can further be broken down until a core easily solvable problem is reached. One primary algorithm for computing document distance is the Demaru-Levenshtein distance algorithm. Although the algorithm is typically used for spellcheck, its applications to sequence alignment also have proven to be fruitful. In fact, close derivatives of the Demaru-Levenshtein distance algorithm are often used such as the Smith-Waterman algorithm which is currently used for [NCIB BLAST search](https://blast.ncbi.nlm.nih.gov/Blast.cgi). 

  The output of dynamic programming is an edit distance, or a numerical value which quantifies the number of edits that one would need to make in order to optimally convert one of the strings into the other. Going back to the previous example of determining the difference between `engaging` and `programming`, you would need to make 6 edits to change `programming` into `engaging` or vice versa. More specifically, you would have to change the `p` into an `e`, change (also called a substitution) `r` into a `n`, remove the `o`, remove the `r`, substitute `m` for `g` and then substitute the second `m` for `g`. And voila! Now we have changed `programming` into `engaging`. But, how do you determine which edits you need to make?

  This comes down the the crux of dynamic programming and breaking the problem down into smaller components. In the matrix that the algorithm fills, as seen below, one can see that for any element, it returns the minimal distance between the string between how far it has "read" in either direction. For example, if we consider the 3 in yellow, this value represents the edit distance between the highlighted green characters and highlighted red characters. In this case, in order to change the string " e" to a " pro", you would need to substitute the `e` for a `p` and then add `ro` (two edits total).

  Yet the algorithm does not need to do this checking every time. Instead, it takes the minimum value of the blue and then adds 1 if the character on that row is not equal to the character on that column. Thus, it selected the 2 and added 1 because `e` is not the same as `o` and thus we get the three highlighted in yellow. In order to fill in the entire table, we need start by filling in the row and column with spaces and then start using the 3-checking method from the element highlighted in orange and proceed to the right.

$$
\begin{align*}
\left(\begin{array}{c|ccccccccc}
 &\colorbox{lightgreen}{ } &\colorbox{lightgreen}{e}&n&g&a&g&i&n&g\\
\hline
 \colorbox{red}{ }&0&1&2&3&4&5&6&7&8\\
\colorbox{red}{p}&1&\colorbox{orange}{1}&2&3&4&5&6&7&8\\
\colorbox{red}{r}&\colorbox{lightblue}{2}&\colorbox{lightblue}{2}&2&3&4&5&6&7&8\\
\colorbox{red}{o}&\colorbox{lightblue}{3}&\colorbox{yellow}{3}&3&3&4&5&6&7&8\\
g&4&4&4&3&4&4&5&6&7\\
r&5&5&5&4&4&5&5&6&7\\
a&6&6&6&5&4&5&6&6&7\\
m&7&7&7&6&5&5&6&7&7\\
m&8&8&8&7&6&6&6&7&8\\
i&9&9&9&8&7&7&6&7&8\\
n&10&10&9&9&8&8&7&6&7\\
g&11&11&10&9&9&8&8&7&6\\
\end{array}\right) \end{align*}
$$

  Now that you are familiar with how the algorithm functions, it becomes obvious that the main downside of dynamic programming is speed, also known as asymptotic complexity, for which it takes to run. This algorithm takes $\mathcal{O}(nm)$ time (where $m$ is the length of one string and $n$ is the length of the other string) to determine the distance. And although comparing 100 strings takes an extremely short amount of time, once one attempts to calculate this for every base pair in the genome, ~3.2 billion times, the run time of the algorithm really starts to add up. In fact, based off some short testing I ran, I calculated that it would take over 300 years to finish!

### Cosine Similarity Distance Approach

  Another characterization of document distance (this time being one technique in plagiarism checking between documents[^2]) can be found by looking at the difference between two vectors which represent the sequences in $n$-th dimensional space. Using this metric, applied via the equation $\text{Similarity}(\overrightarrow{A},\overrightarrow{B}) = \frac{\sum_{i=1}^n A_iB_i}{\sqrt{\sum A_i^2}\sqrt {\sum B_i^2}}$, we can make similar quantitative characterizations of the difference between two strings.

  Returning to our previous example of `programming` and `engaging`, the application of the formula would yield a value of 0.606339 (out of a 1 if the documents were the same or -1 if they were completely opposite). Further, the running time for this algorithm is $\mathcal{O}(n)$ where n is the dimensionality of the two vectors.

  Now, this seems to be much faster than the Demaru-Levenshtein distance algorithm&mdash;and indeed it is. However, when one considers its application to sequence alignment, things start to break down. First, unaltered, the vectors contain numbers which relate to the number of instances in which a word[^4] (in this case A, T, C, or G) arises in a sequence. However, this is a problem because even if the relative occurrence is the same, the order delineates two sequences in the human genome. This can be mitigated by making the length of the vector equal to the length of the strings, but in that case, you begin to run into the issue of different bases being worth more or less based on the number assigned.

  Although this problem can be mitigated as well, the final issue&mdash;speed&mdash;remains. Even though the algorithm runs in $\mathcal{O}(n)$ time, it still need to be run on ~3.2 billion times for every short read which returns us to the same issue of as the Demaru-Levenshtein distance.

## What is a Possible Solution Then?

  Initially put forth by Heng Li and and popularized by Ben Langmead, the Burrows-Wheeler transformation (BWT) was originally intended, and is sparsely used as a data compression algorithm. However, it turns out to be run in $\mathcal{O}(n)$ time for string alignment and you only need to run the algorithm once to find all mapping places of the read, speeding up string alignment significantly. 

  Although the implementation of the Burrows-Wheeler Transform is exceptionally complex, in essence a matrix containing all possible circular rotations is created and the last row is selected. Then, a function is created during the matrix creation process which allows one to get a range of all possible strings that have the same sequence up to the character which has not yet been checked. Once you arrive at the final character, you then have a list of all of the mappings for this read.

  This may seem like a perfect algorithm due to its very fast time complexity, however the main drawback is that it requires perfect string matching. That is, if a mutation were to occur in the DNA, matching does not always work[^3]. As a result, mutations to the genome can cause the Burrows-Wheeler Transform to not be able to match certain short reads.

## The Best of Both Worlds

  We have seen two possible solutions: Dynamic programming and the BWT. Dynamic programming (particularly Demaru-Levenshtein) being very good at accounting for mutations as well as insertions and deletions while taking a long time to complete, and the BWT which is extremely quick but is not good at gapped alignment (where a base was added or removed) and struggles at mutations.

  To combine the benefits of both worlds, Ben Langmead pioneered Bowtie 2, which maps even smaller portions of the read via BWT and then uses, in this case the Smith-Waterman heuristic to achieve the benefit of gapped read alignment and mutations.

  So... problem solved then? Not exactly. Although Bowtie 2 is quite accurate, for my science fair project, *Novel Application of Document Distance Algorithm for DNA Copy Number Variation Detection*, we did an analysis of the Demaru-Levenshtein distance between where reads were mapped and found that some certain reads mapped quite poorly to the genome. As such, we then culled some of the most different reads. In theory, the removal of one or two reads from a particular CNV should not change its detection but in our case it did. Thus, we concluded that the secondary pass method looks promising and also that more work still must be done to improve mapping&mdash;something I hope to do one day in the future!

[^1]: Interestingly Richard Bellman, who pioneered the concept, named it this because he wanted to capture the recursive nature of the solution and because he thought that it sounded impressive.
[^2]: There is a very good MIT Open Courseware lecture which mentions document distance (which in fact inspired a lot of this inquiry) found [here](https://ocw.mit.edu/courses/electrical-engineering-and-computer-science/6-006-introduction-to-algorithms-fall-2011/lecture-videos/lecture-2-models-of-computation-document-distance/).
[^3]: The algorithm is able to accommodate some mutations through a process called [backtracking](https://en.wikipedia.org/wiki/Backtracking), however BWT fails at gapped read alignment and mutation alignment can be suboptimal.
[^4]: In this case, words (the smallest unit we care about in document distance) are considered the base pairs.
